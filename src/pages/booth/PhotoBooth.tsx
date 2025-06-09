import React, { useRef, useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import Webcam from 'react-webcam';
import { colorToken } from '../../utils/colorToken';
import ChangeIcon from '../../assets/icons/change.svg';
import CameraIcon from '../../assets/icons/camera.svg';

// MediaPipe 타입 정의
interface MediaPipeFaceDetectionInstance {
  setOptions(options: { model: string; minDetectionConfidence: number }): void;
  onResults(callback: (results: MediaPipeResults) => void): void;
  send(inputs: { image: HTMLVideoElement }): Promise<void>;
  close(): void;
}

interface MediaPipeFaceDetectionClass {
  new (config: { locateFile: (file: string) => string }): MediaPipeFaceDetectionInstance;
}

interface MediaPipeCameraInstance {
  start(): void;
  stop(): void;
}

interface MediaPipeCameraClass {
  new (videoElement: HTMLVideoElement, config: { onFrame: () => Promise<void>; width: number; height: number }): MediaPipeCameraInstance;
}

interface FilterStyle {
  name: string;
  style: {
    filter?: string;
    webkitFilter?: string;
  };
}

interface Sticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
  isAutoTracking?: boolean;
}

interface FaceDetectionResult {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

interface MediaPipeDetection {
  boundingBox: {
    xCenter: number;
    yCenter: number;
    width: number;
    height: number;
  };
}

interface MediaPipeResults {
  detections?: MediaPipeDetection[];
}

interface MediaPipeFaceDetection {
  close(): void;
  send(inputs: { image: HTMLVideoElement }): Promise<void>;
}

interface MediaPipeCamera {
  start(): void;
  stop(): void;
}

interface Frame {
  id: string;
  name: string;
  src: string;
}

const FILTERS: Record<string, FilterStyle> = {
  'none': { name: '기본', style: {} },
  'blur': { 
    name: '블러',
    style: {
      filter: 'blur(3px)',
      webkitFilter: 'blur(3px)'
    }
  },
  'grayscale': { 
    name: '흑백',
    style: {
      filter: 'grayscale(100%)',
      webkitFilter: 'grayscale(100%)'
    }
  },
  'bright': { 
    name: '밝게',
    style: {
      filter: 'brightness(140%) contrast(130%)',
      webkitFilter: 'brightness(140%) contrast(130%)'
    }
  },
};

const STICKER_OPTIONS = ['❤️', '💕','🌟', '✨', '🎉', '💍','💋'];
const FACE_TRACKING_STICKERS = ['😍', '😘', '🤩','😆','🕶️'];

const FRAME_OPTIONS: Frame[] = [
  { id: 'none', name: '프레임 없음', src: '' },
  { 
    id: 'frame1', 
    name: '혜원&명진', 
    src: '/frames/frame1.png'
  },
];

const getFrameSrc = (frameId: string): string => {
  if (frameId === 'none') return '';
  if (frameId === 'frame1') return '/frames/frame1.png';
  return `/frames/${frameId}-frame-square.png`;
};

const getCurrentFrameSrc = (frameId: string): string => {
  return getFrameSrc(frameId);
};

type FilterType = keyof typeof FILTERS;
type TabType = 'filter' | 'sticker';

const PhotoBooth = () => {
  const webcamRef = useRef<Webcam>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const webcamContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceDetectionRef = useRef<MediaPipeFaceDetectionInstance | null>(null);
  const cameraRef = useRef<MediaPipeCameraInstance | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('none');
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [currentFrame, setCurrentFrame] = useState<string>('frame1');
  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<TabType>('filter');
  const [faceDetections, setFaceDetections] = useState<FaceDetectionResult[]>([]);
  const [isFaceDetectionEnabled, setIsFaceDetectionEnabled] = useState(false);
  const [isMediaPipeLoading, setIsMediaPipeLoading] = useState(false);
  const [isMediaPipeLoaded, setIsMediaPipeLoaded] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const videoConstraints = {
    width: { min: 720, ideal: 1920, max: 2560 },
    height: { min: 720, ideal: 1920, max: 2560 },
    facingMode: facingMode,
    aspectRatio: 1,
    frameRate: { ideal: 30 },
  };

  const loadMediaPipeViaScript = async (): Promise<{ FaceDetection: MediaPipeFaceDetectionClass; Camera: MediaPipeCameraClass }> => {
    return new Promise((resolve, reject) => {
      // 스크립트가 이미 로드되었는지 확인
      if (window.FaceDetection && window.Camera) {
        resolve({ FaceDetection: window.FaceDetection, Camera: window.Camera });
        return;
      }

      // MediaPipe 스크립트 로드
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/face_detection.js';
      script.onload = () => {
        const cameraScript = document.createElement('script');
        cameraScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js';
        cameraScript.onload = () => {
          resolve({ FaceDetection: window.FaceDetection, Camera: window.Camera });
        };
        cameraScript.onerror = reject;
        document.head.appendChild(cameraScript);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const loadMediaPipe = async () => {
    if (isMediaPipeLoaded || isMediaPipeLoading) return;
    
    setIsMediaPipeLoading(true);
    
    try {
      // AWS Amplify는 HTTPS를 기본 제공하므로 확인 불필요하지만 안전장치로 유지
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        throw new Error('MediaPipe requires HTTPS in production');
      }

      // 완전히 런타임 로딩 사용 (Amplify 환경에 최적화)
      const { FaceDetection: FaceDetectionClass, Camera: CameraClass } = await loadMediaPipeViaScript();

      const faceDetection = new FaceDetectionClass({
        locateFile: (file: string) => {
          // Amplify에서는 CDN 사용이 더 안정적
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
        }
      });

      faceDetection.setOptions({
        model: 'short',
        minDetectionConfidence: 0.5,
      });

      faceDetection.onResults((results: MediaPipeResults) => {
        if (results.detections && results.detections.length > 0) {
          const detections: FaceDetectionResult[] = results.detections.map((detection: MediaPipeDetection) => {
            return {
              x: detection.boundingBox.xCenter * 100,
              y: detection.boundingBox.yCenter * 100,
              width: detection.boundingBox.width * 100,
              height: detection.boundingBox.height * 100,
              confidence: 0.8,
            };
          });
          
          setFaceDetections(detections);
        } else {
          setFaceDetections([]);
        }
      });

      faceDetectionRef.current = faceDetection;
      setIsMediaPipeLoaded(true);
    } catch (error) {
      console.error('MediaPipe 로딩 실패:', error);
      
      let errorMessage = '얼굴감지 기능을 사용할 수 없습니다.';
      
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage += ' 네트워크 연결을 확인해주세요.';
        } else if (error.message.includes('CORS')) {
          errorMessage += ' 브라우저 보안 정책 문제입니다.';
        } else {
          errorMessage += ' 브라우저가 지원되지 않거나 리소스 로딩에 실패했습니다.';
        }
      }
      
      console.warn(errorMessage);
      setIsFaceDetectionEnabled(false);
    } finally {
      setIsMediaPipeLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (faceDetectionRef.current) {
        faceDetectionRef.current.close();
      }
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, []);

  const handleUserMedia = useCallback(async (stream: MediaStream) => {
    setIsCameraReady(true);
    
    if (webcamRef.current?.video) {
      videoRef.current = webcamRef.current.video;
      
      // 기존 Camera가 없고 얼굴 감지가 활성화된 경우에만 새로 생성
      if (faceDetectionRef.current && isFaceDetectionEnabled && isMediaPipeLoaded && !cameraRef.current) {
        const { Camera: CameraClass } = await loadMediaPipeViaScript();
        const camera = new CameraClass(videoRef.current, {
          onFrame: async () => {
            if (faceDetectionRef.current && videoRef.current) {
              await faceDetectionRef.current.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 640,
        });
        cameraRef.current = camera;
        camera.start();
      }
    }
  }, [isFaceDetectionEnabled, isMediaPipeLoaded]);

  const toggleFaceDetection = async () => {
    if (!isFaceDetectionEnabled) {
      if (!isMediaPipeLoaded) {
        await loadMediaPipe();
      }
      
      // MediaPipe 로딩 완료 후 확실히 Camera 시작
      if (videoRef.current && faceDetectionRef.current) {
        try {
          const { Camera: CameraClass } = await loadMediaPipeViaScript();
          const camera = new CameraClass(videoRef.current, {
            onFrame: async () => {
              if (faceDetectionRef.current && videoRef.current && !isCapturing) {
                await faceDetectionRef.current.send({ image: videoRef.current });
              }
            },
            width: 640,
            height: 640,
          });
          cameraRef.current = camera;
          camera.start();
          console.log('MediaPipe Camera 시작 완료!');
        } catch (error) {
          console.error('MediaPipe Camera 시작 실패:', error);
        }
      }
      
      setIsFaceDetectionEnabled(true);
    } else {
      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
        setFaceDetections([]);
      }
      setIsFaceDetectionEnabled(false);
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
    
    if (videoRef.current) {
      videoRef.current.style.filter = '';
      videoRef.current.style.webkitFilter = '';
      
      Object.assign(videoRef.current.style, FILTERS[filter].style);
    }
  };

  const addSticker = (emoji: string) => {
    const newSticker: Sticker = {
      id: Date.now().toString(),
      emoji,
      x: 50,
      y: 50,
      size: 28,
      isAutoTracking: false,
    };
    setStickers(prev => [...prev, newSticker]);
  };

  const addFaceTrackingSticker = (emoji: string) => {
    if (faceDetections.length === 0) {
      alert('얼굴이 감지되지 않았습니다. 잠시 후 다시 시도해주세요!');
      return;
    }

    const face = faceDetections[0];
    
    // 브라우저 너비에 따라 스티커 크기 동적 조정
    const browserWidth = window.innerWidth;
    let stickerSize: number;
    
    if (browserWidth <= 768) {
      // 모바일: 브라우저 너비의 반 정도, 최대 150px
      stickerSize = Math.min(browserWidth * 0.5, 150);
    } else {
      // 데스크톱: 기존 크기 유지
      stickerSize = 300;
    }
    
    const newSticker: Sticker = {
      id: Date.now().toString(),
      emoji,
      x: face.x,
      y: face.y,
      size: stickerSize,
      isAutoTracking: true,
    };
    
    setStickers(prev => {
      const nonTrackingStickers = prev.filter(s => !s.isAutoTracking);
      return [...nonTrackingStickers, newSticker];
    });
  };

  const handleStickerMouseDown = (e: React.MouseEvent, stickerId: string) => {
    e.preventDefault();
    const container = webcamContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const sticker = stickers.find(s => s.id === stickerId);
    if (!sticker) return;

    const stickerX = (sticker.x / 100) * rect.width;
    const stickerY = (sticker.y / 100) * rect.height;

    setDraggedSticker(stickerId);
    setDragOffset({
      x: e.clientX - rect.left - stickerX,
      y: e.clientY - rect.top - stickerY,
    });
  };

  const handleStickerTouchStart = (e: React.TouchEvent, stickerId: string) => {
    e.preventDefault();
    const container = webcamContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const sticker = stickers.find(s => s.id === stickerId);
    if (!sticker) return;

    const touch = e.touches[0];
    const stickerX = (sticker.x / 100) * rect.width;
    const stickerY = (sticker.y / 100) * rect.height;

    setDraggedSticker(stickerId);
    setDragOffset({
      x: touch.clientX - rect.left - stickerX,
      y: touch.clientY - rect.top - stickerY,
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggedSticker || !webcamContainerRef.current) return;

    const container = webcamContainerRef.current;
    const rect = container.getBoundingClientRect();
    
    const newX = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const newY = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;

    setStickers(prev => prev.map(sticker => 
      sticker.id === draggedSticker 
        ? { ...sticker, x: Math.max(0, Math.min(95, newX)), y: Math.max(0, Math.min(95, newY)) }
        : sticker
    ));
  }, [draggedSticker, dragOffset]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!draggedSticker || !webcamContainerRef.current) return;

    const container = webcamContainerRef.current;
    const rect = container.getBoundingClientRect();
    const touch = e.touches[0];
    
    const newX = ((touch.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const newY = ((touch.clientY - rect.top - dragOffset.y) / rect.height) * 100;

    setStickers(prev => prev.map(sticker => 
      sticker.id === draggedSticker 
        ? { ...sticker, x: Math.max(0, Math.min(95, newX)), y: Math.max(0, Math.min(95, newY)) }
        : sticker
    ));
  }, [draggedSticker, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDraggedSticker(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const handleTouchEnd = useCallback(() => {
    setDraggedSticker(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (draggedSticker) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [draggedSticker, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const removeSticker = (stickerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStickers(prev => prev.filter(s => s.id !== stickerId));
  };

  const frameOptionsWithSrc = FRAME_OPTIONS.map(frame => ({
    ...frame,
    src: getFrameSrc(frame.id)
  }));

  const captureWithStickers = async (fixedStickers: Sticker[]): Promise<string | null> => {
    if (!webcamRef.current || !canvasRef.current || !videoRef.current) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 고해상도 캔버스 크기 설정 (최소 1080p, 이상적으로는 비디오 실제 크기)
    const videoElement = videoRef.current;
    const targetWidth = Math.max(videoElement.videoWidth || 1920, 1080);
    const targetHeight = Math.max(videoElement.videoHeight || 1920, 1080);
    
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    try {
      // 필터 적용
      if (currentFilter !== 'none' && FILTERS[currentFilter].style.filter) {
        ctx.filter = FILTERS[currentFilter].style.filter || 'none';
      } else {
        ctx.filter = 'none';
      }

      // 비디오 엘리먼트에서 직접 캔버스에 그리기 (고화질)
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // 필터 초기화
      ctx.filter = 'none';

      const stickerContainerRect = webcamContainerRef.current?.getBoundingClientRect();
      
      if (stickerContainerRect && fixedStickers.length > 0) {
        fixedStickers.forEach(sticker => {
          // 스티커 위치를 캔버스 좌표로 변환
          const stickerX = (sticker.x / 100) * canvas.width;
          const stickerY = (sticker.y / 100) * canvas.height;
          
          // 고해상도에 맞는 스케일링
          const scaleFactor = canvas.width / stickerContainerRect.width;
          const stickerSize = sticker.size * scaleFactor;

          ctx.font = `${stickerSize}px Arial`;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          ctx.fillText(sticker.emoji, stickerX, stickerY);
        });
      }

      if (currentFrame !== 'none') {
        const frameSrc = getCurrentFrameSrc(currentFrame);
        if (frameSrc) {
          return new Promise((resolve) => {
            const frameImg = new Image();
            frameImg.onload = () => {
              ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
              // 최고 화질로 PNG 저장
              const dataURL = canvas.toDataURL('image/png', 1.0);
              resolve(dataURL);
            };
            frameImg.onerror = () => {
              const dataURL = canvas.toDataURL('image/png', 1.0);
              resolve(dataURL);
            };
            frameImg.src = frameSrc;
          });
        }
      }

      // 최고 화질로 PNG 저장
      const dataURL = canvas.toDataURL('image/png', 1.0);
      return dataURL;
    } catch (error) {
      console.error('Canvas 작업 중 오류:', error);
      return null;
    }
  };

  const capture = async () => {
    if (!isCameraReady) {
      setIsCameraReady(true);
      return;
    }

    if (photos.length > 0) {
      setPhotos([]);
      setStickers([]);
      return;
    }

    // 캡처 시작 - 얼굴 추적 완전 중단
    setIsCapturing(true);

    // 얼굴 추적을 즉시 중단하여 스티커 위치 고정
    // onFrame에서 isCapturing 체크로 처리가 중단됨

    // 얼굴 추적 스티커를 일반 스티커로 변환하고 현재 화면 위치로 고정
    const fixedStickers = stickers.map(sticker => {
      if (sticker.isAutoTracking && faceDetections.length > 0) {
        // 현재 화면에서 보이는 위치를 퍼센트로 계산해서 고정
        const face = faceDetections[0];
        const adjustedX = face.x - 20;
        const adjustedY = Math.max(5, face.y - face.height * 0.5);
        
        return {
          ...sticker,
          x: adjustedX,
          y: adjustedY,
          isAutoTracking: false
        };
      }
      return {
        ...sticker,
        isAutoTracking: false
      };
    });
    
    setStickers(fixedStickers);

    if (webcamRef.current) {
      let imageSrc: string | null = null;
      
      if (fixedStickers.length > 0 || currentFrame !== 'none' || currentFilter !== 'none') {
        imageSrc = await captureWithStickers(fixedStickers);
        // captureWithStickers가 실패하면 기본 스크린샷 사용
        if (!imageSrc) {
          imageSrc = webcamRef.current.getScreenshot();
        }
      } else {
        imageSrc = webcamRef.current.getScreenshot();
      }

      if (imageSrc) {
        setPhotos((prev) => [...prev, imageSrc]);
      } else {
        alert('사진 촬영에 실패했습니다. 다시 시도해주세요.');
      }
    }

    // 캡처 완료
    setIsCapturing(false);
  };

  const downloadPhoto = (photoSrc: string, index: number) => {
    const link = document.createElement('a');
    link.href = photoSrc;
    link.download = `photobooth-${index + 1}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  return (
    <Container>
      <Title>Photo Booth</Title>
      <Content>
        <WebcamContainer>
          <CaptureButtonContainer>
            <CameraSwitchButton onClick={toggleCamera}>
              <img src={ChangeIcon} alt="카메라 전환" width="16" height="16" />
              {facingMode === 'user' ? '후면' : '전면'}
            </CameraSwitchButton>
            <CaptureButton 
              onClick={capture}
            >
              {!isCameraReady ? (
                '촬영하기'
              ) : photos.length > 0 ? (
                <>
                  <img src={CameraIcon} alt="카메라" width="20" height="20" />
                  다시찍기
                </>
              ) : (
                <img src={CameraIcon} alt="카메라" width="20" height="20" />
              )}
            </CaptureButton>
            <DownloadButton 
              onClick={() => photos.length > 0 && downloadPhoto(photos[photos.length - 1], photos.length - 1)}
              disabled={photos.length === 0}
            >
              다운로드
            </DownloadButton>
          </CaptureButtonContainer>
        
          <WebcamWrapper ref={webcamContainerRef}>
            {photos.length > 0 ? (
              <CapturedPhoto 
                src={photos[photos.length - 1]} 
                alt="촬영된 사진"
              />
            ) : isCameraReady ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  screenshotQuality={1.0}
                  width="100%"
                  height="100%"
                  videoConstraints={videoConstraints}
                  onUserMedia={handleUserMedia}
                />
                
                {isFaceDetectionEnabled && faceDetections.map((face, index) => (
                  <FaceDetectionBox
                    key={index}
                    style={{
                      left: `${face.x - face.width / 2}%`,
                      top: `${face.y - face.height / 2}%`,
                      width: `${face.width}%`,
                      height: `${face.height}%`,
                    }}
                  />
                ))}
                
                {stickers.map(sticker => {
                  // 얼굴 추적 스티커는 실시간으로 화면 위치만 업데이트
                  const displayX = sticker.isAutoTracking && faceDetections.length > 0 && !isCapturing
                    ? faceDetections[0].x - 20 
                    : sticker.x;
                  const displayY = sticker.isAutoTracking && faceDetections.length > 0 && !isCapturing
                    ? Math.max(5, faceDetections[0].y - faceDetections[0].height * 0.5) 
                    : sticker.y;
                    
                  return (
                    <StickerOverlay
                      key={sticker.id}
                      style={{
                        left: `${displayX}%`,
                        top: `${displayY}%`,
                        fontSize: `${sticker.size}px`,
                        cursor: draggedSticker === sticker.id ? 'grabbing' : 'grab',
                      }}
                      onMouseDown={(e) => handleStickerMouseDown(e, sticker.id)}
                      onTouchStart={(e) => handleStickerTouchStart(e, sticker.id)}
                      onDoubleClick={(e) => removeSticker(sticker.id, e)}
                    >
                      {sticker.emoji}
                      <DeleteButton
                        onClick={(e) => removeSticker(sticker.id, e)}
                        title="스티커 삭제 (또는 더블클릭)"
                      >
                        ×
                      </DeleteButton>
                    </StickerOverlay>
                  );
                })}
                {currentFrame !== 'none' && (
                  <FrameOverlay>
                    <FrameImage 
                      src={getCurrentFrameSrc(currentFrame)}
                      alt="선택된 프레임"
                      onError={(e) => {
                        setCurrentFrame('none');
                      }}
                    />
                  </FrameOverlay>
                )}
              </>
            ) : (
              <CameraPlaceholder>
                <img src={CameraIcon} alt="카메라" width="48" height="48" />
                <PlaceholderText>촬영하기 버튼을 눌러 카메라를 시작하세요</PlaceholderText>
              </CameraPlaceholder>
            )}
          </WebcamWrapper>
          
          <canvas 
            ref={canvasRef} 
            style={{ display: 'none' }}
          />
          
          <TabContainer>
            <TabNavigation>
              <TabButton 
                isActive={activeTab === 'filter'} 
                onClick={() => setActiveTab('filter')}
              >
                Filter & Frame
              </TabButton>
              <TabButton 
                isActive={activeTab === 'sticker'} 
                onClick={() => setActiveTab('sticker')}
              >
                Sticker
              </TabButton>
            </TabNavigation>

            <TabContent>
              {activeTab === 'filter' && (
                <FilterSection>
                  <SectionTitle>필터</SectionTitle>
                  <FilterGrid>
                    {(Object.entries(FILTERS) as [FilterType, FilterStyle][]).map(([filter, { name }]) => (
                      <FilterButton
                        key={filter}
                        onClick={() => handleFilterChange(filter)}
                        isSelected={currentFilter === filter}
                      >
                        {name}
                      </FilterButton>
                    ))}
                  </FilterGrid>
                  
                  <SectionTitle>프레임</SectionTitle>
                  <FrameGrid>
                    {frameOptionsWithSrc.map((frame) => (
                      <FrameButton
                        key={frame.id}
                        onClick={() => setCurrentFrame(frame.id)}
                        isSelected={currentFrame === frame.id}
                        title={frame.name}
                      >
                        {frame.id === 'none' ? (
                          <NoFrameIndicator></NoFrameIndicator>
                        ) : (
                          <FramePreview 
                            src={frame.src}
                            alt={frame.name}
                            onError={(e) => {
                              console.log(`프레임 미리보기 로드 실패: ${frame.name}`);
                            }}
                          />
                        )}
                        <FrameLabel>{frame.name}</FrameLabel>
                      </FrameButton>
                    ))}
                  </FrameGrid>
                </FilterSection>
              )}

              {activeTab === 'sticker' && (
                <StickerSection>
                  <SectionTitle>일반 스티커</SectionTitle>
                  <StickerGrid>
                    {STICKER_OPTIONS.map((emoji, index) => (
                      <StickerButton
                        key={index}
                        onClick={() => addSticker(emoji)}
                        title={`${emoji} 스티커 추가`}
                      >
                        {emoji}
                      </StickerButton>
                    ))}
                  </StickerGrid>
                  <SectionTitle>얼굴 추적 스티커</SectionTitle>
                  <StickerGrid>
                    {FACE_TRACKING_STICKERS.map((emoji, index) => (
                      <FaceTrackingStickerButton
                        key={index}
                        onClick={() => addFaceTrackingSticker(emoji)}
                        title={`${emoji} 얼굴 추적 스티커 추가`}
                        disabled={!isFaceDetectionEnabled || faceDetections.length === 0}
                      >
                        {emoji}
                      </FaceTrackingStickerButton>
                    ))}
                    
                    <FaceToggleButton
                      onClick={toggleFaceDetection}
                      isActive={isFaceDetectionEnabled}
                      disabled={isMediaPipeLoading || isFaceDetectionEnabled}
                      style={{ 
                        width: '4rem', 
                        height: '32px', 
                        fontSize: '0.7rem',
                        borderRadius: '8px',
                        padding: '0',
                        minWidth: 'unset',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {isMediaPipeLoading 
                        ? '추적 중' 
                        : isFaceDetectionEnabled 
                          ? '추적 ON' 
                          : '추적 OFF'
                      }
                    </FaceToggleButton>
                  </StickerGrid>
                  
                  {isFaceDetectionEnabled && faceDetections.length > 0 && (
                    <FaceDetectionInfo>
                      {faceDetections.length}개 얼굴 감지됨
                    </FaceDetectionInfo>
                  )}
                </StickerSection>
              )}
            </TabContent>
          </TabContainer>
        </WebcamContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div({
  width: '100%',
  minHeight: '100vh',
  padding: '2rem',
  backgroundColor: '#eee',
  '@media (max-width: 768px)': {
    padding: '2rem 0.5rem 1rem 0.5rem',
  },
});

const Title = styled.h1({
  fontFamily: 'PPEditorialOldItalic',
  fontSize: '4rem',
  fontWeight: 'bold',
  textAlign: 'center',
  color: colorToken.black,
});

const Content = styled.div({
  margin: '0 auto',
  padding: '1rem',
});

const WebcamContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto 2rem auto',
  padding: '1rem',
  backgroundColor: '#fff',
  borderRadius: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const WebcamWrapper = styled.div({
  width: '100%',
  aspectRatio: '1',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '4px',
  '& > video': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const StickerOverlay = styled.div({
  position: 'absolute',
  userSelect: 'none',
  zIndex: 10,
  transition: 'none',
  '&:hover': {
    '& > button': {
      opacity: 1,
    },
  },
});

const DeleteButton = styled.button({
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: '#ff4444',
  color: '#fff',
  border: 'none',
  fontSize: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
  opacity: 0,
  transition: 'opacity 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#ff0000',
  },
});

const TabContainer = styled.div({
  width: '100%',
  marginTop: '0.1rem',
  backgroundColor: '#fff',
  overflow: 'hidden',
});

const TabNavigation = styled.div({
  display: 'flex',
  backgroundColor: 'transparent',
  padding: '0.2rem',
  gap: '0.1rem',
});

const TabButton = styled.button<{ isActive: boolean }>(({ isActive }) => ({
  flex: 1,
  padding: '0.6rem',
  margin: '0.2rem',
  fontSize: '0.8rem',
  fontWeight: 600,
  color: isActive ? '#fff' : '#333',
  backgroundColor: isActive ? colorToken.black : '#ffffff',
  border: `1px solid ${isActive ? colorToken.black : '#dee2e6'}`,
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#ddd',
    border: `1px solid #ddd`,
    color:  colorToken.black ,
  },
}));

const TabContent = styled.div({
  padding: '1rem',
  height: '11rem',
  backgroundColor: '#eee',
  borderRadius: '20px',
});

const FilterSection = styled.div({
  width: '100%',
});

const FilterGrid = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.1rem',
  justifyContent: 'center',
  alignItems: 'center',
});

const StickerSection = styled.div({
  width: '100%',
});

const FrameOverlay = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 20,
});

const FrameImage = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const FrameGrid = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  justifyContent: 'center',
  alignItems: 'center',
});

const FrameButton = styled.button<{ isSelected: boolean }>(({ isSelected }) => ({
  padding: '0.5rem 1rem',
  minWidth: '100px',
  height: '50px',
  border: `1px solid ${isSelected ? colorToken.black : '#dee2e6'}`,
  borderRadius: '10px',
  backgroundColor: isSelected ? colorToken.black : '#ffffff',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  fontSize: '0.7rem',
  fontWeight: isSelected ? '600' : '400',
  color: isSelected ? '#fff' : '#333',
  '&:hover': {
    backgroundColor: '#ddd',
    border: `1px solid #ddd`,
    color:  colorToken.black ,
  },
}));

const FramePreview = styled.img({
  width: '20px',
  height: '20px',
  objectFit: 'contain',
  marginBottom: '0.25rem',
});

const FrameLabel = styled.span({
  fontSize: '0.65rem',
  color: 'inherit',
  textAlign: 'center',
  lineHeight: '1.2',
});

const NoFrameIndicator = styled.div({
  width: '25px',
  height: '25px',
  border: '1px dashed #ccc',
  borderRadius: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.6rem',
  color: '#666',
  marginBottom: '0.25rem',
});

const StickerGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(32px, max-content))',
  gap: '0.35rem',
  marginBottom: '0.8rem',
  justifyItems: 'center',
  alignItems: 'center',
  maxWidth: '100%',
  justifyContent: 'center',
});

const StickerButton = styled.button({
  width: '32px',
  height: '32px',
  fontSize: '18px',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: colorToken.black,
    transform: 'scale(1.05)',
  },
});

const FaceDetectionToggle = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem',
});

const FaceToggleButton = styled.button<{ isActive: boolean; disabled?: boolean }>(({ isActive, disabled }) => ({
  padding: '0.4rem 0.8rem',
  fontSize: '0.7rem',
  fontWeight: '500',
  borderRadius: '12px',
  backgroundColor: '#f5f5f5',
  color: colorToken.black,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#ddd',
  },
  '&:disabled': {
    backgroundColor: '#ddd',
    cursor: 'not-allowed',
    color: '#666',
  },
}));

const FaceDetectionInfo = styled.span({
  fontSize: '0.7rem',
  color: '#28a745',
  fontWeight: '500',
});

const FaceDetectionBox = styled.div({
  position: 'absolute',
  border: `2px solid ${colorToken.black}`,
  borderRadius: '4px',
  pointerEvents: 'none',
  zIndex: 5,
  opacity: 0.7,
});

const TrackingIndicator = styled.div({
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  fontSize: '10px',
  zIndex: 15,
});

const FaceTrackingStickerButton = styled.button<{ disabled?: boolean }>(({ disabled }) => ({
  width: '32px',
  height: '32px',
  fontSize: '18px',
  borderRadius: '8px',
  backgroundColor: disabled ? '#f5f5f5' : '#ffffff',
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  opacity: disabled ? 0.5 : 1,
  '&:hover:not(:disabled)': {
    backgroundColor: colorToken.black,
    borderColor: colorToken.black,
    transform: 'scale(1.05)',
  },
}));

const CameraSwitchButton = styled.button({
  width: '70px',
  height: '26px',
  fontSize: '0.7rem',
  fontWeight: '600',
  color: colorToken.black,
  backgroundColor: '#ffffff',
  border: `1px solid #ddd`,
  borderRadius: '15px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.3rem',
  '&:hover': {
    backgroundColor: '#ddd',
  },
});

const CapturedPhoto = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '4px',
});

const CaptureButtonContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  marginBottom: '0.5rem',
  width: '100%',
});

const DownloadButton = styled.button<{ disabled?: boolean }>(({ disabled }) => ({
  width: '70px',
  height: '26px',
  fontSize: '0.7rem',
  fontWeight: '600',
  color: disabled ? '#999' : colorToken.black,
  backgroundColor: disabled ? '#f5f5f5' : '#ffffff',
  border: `1px solid #ddd`,
  borderRadius: '15px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'all 0.2s ease',
  opacity: disabled ? 0.5 : 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#ddd',
  },
}));

const CaptureButton = styled.button({
  height: '40px',
  fontSize: '0.7rem',
  fontWeight: '600',
  color: '#fff',
  backgroundColor: colorToken.black,
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minWidth: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  '&:hover:not(:disabled)': {
    transform: 'scale(1.05)',
  },
  '&:disabled': {
    backgroundColor: '#ccc',
    color: '#666',
    cursor: 'not-allowed',
  },
});

const FilterButton = styled.button<{ isSelected: boolean }>(({ isSelected }) => ({
  padding: '0.5rem 1rem',
  fontSize: '0.7rem',
  fontWeight: isSelected ? '800' : '400',
  color: isSelected ? '#fff' : '#333',
  backgroundColor: isSelected ? colorToken.black : '#ffffff',
  border: `1px solid ${isSelected ? colorToken.black : '#dee2e6'}`,
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#ddd',
    border: `1px solid #ddd`,
    color:  colorToken.black ,
  },
}));

const SectionTitle = styled.h3({
  fontSize: '0.8rem',
  fontWeight: '600',
  color: '#333',
  marginBottom: '0.2rem',
  marginTop: '0.4rem',
  '&:first-of-type': {
    marginTop: '0',
  },
});

const CameraPlaceholder = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  gap: '1rem',
});

const PlaceholderText = styled.p({
  color: '#666',
  fontSize: '0.9rem',
  textAlign: 'center',
  margin: 0,
});

// Window 객체에 MediaPipe 타입 확장 (AWS Amplify 환경용)
declare global {
  interface Window {
    FaceDetection: MediaPipeFaceDetectionClass;
    Camera: MediaPipeCameraClass;
  }
}

export default PhotoBooth;