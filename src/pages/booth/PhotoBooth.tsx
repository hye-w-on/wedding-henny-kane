import React, { useRef, useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import Webcam from 'react-webcam';
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';

const MAX_PHOTOS = 4;

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

const STICKER_OPTIONS = ['❤️', '💕', '⭐', '✨', '🎉', '💖', '🌟', '💍', '🎁', '🌹'];
const FACE_TRACKING_STICKERS = ['😍', '🥰', '😘', '🤩', '😎', '😊', '😄','🕶️'];

// 샘플 프레임들 - 1:1 정사각형 비율
const FRAME_OPTIONS: Frame[] = [
  { id: 'none', name: '프레임 없음', src: '' },
  { 
    id: 'frame1', 
    name: '혜원&명진', 
    src: '/frames/frame1.png'
  },
];

// 프레임 경로를 1:1 정사각형 기준으로 반환하는 함수
const getFrameSrc = (frameId: string): string => {
  if (frameId === 'none') return '';
  if (frameId === 'frame1') return '/frames/frame1.png';
  return `/frames/${frameId}-frame-square.png`;
};

// 현재 선택된 프레임의 src 가져오기
const getCurrentFrameSrc = (frameId: string): string => {
  return getFrameSrc(frameId);
};

type FilterType = keyof typeof FILTERS;
type TabType = 'filter' | 'sticker' | 'frame';

const PhotoBooth = () => {
  const webcamRef = useRef<Webcam>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const webcamContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceDetectionRef = useRef<FaceDetection | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('none');
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [currentFrame, setCurrentFrame] = useState<string>('none');
  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('filter');
  const [faceDetections, setFaceDetections] = useState<FaceDetectionResult[]>([]);
  const [isFaceDetectionEnabled, setIsFaceDetectionEnabled] = useState(false);
  const [isMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
    return false;
  });
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const videoConstraints = {
    width: { min: 640, ideal: 1080, max: 1920 },
    height: { min: 640, ideal: 1080, max: 1920 },
    facingMode: facingMode,
    aspectRatio: 1, // 1:1 정사각형
    frameRate: { ideal: 30 },
  };

  // 얼굴 추적 스티커 위치 업데이트
  const updateFaceTrackingStickers = useCallback((faces: FaceDetectionResult[]) => {
    if (faces.length === 0) return;

    setStickers(prev => {
      const updated = prev.map(sticker => {
        if (sticker.isAutoTracking && faces[0]) {
          const face = faces[0];
          // 얼굴 중심에서 더 정확한 위치 조정
          return {
            ...sticker,
            x: face.x - 20, // 스티커 크기를 고려해서 중심 맞춤
            y: Math.max(5, face.y - face.height * 0.5),
          };
        }
        return sticker;
      });
      
      return updated;
    });
  }, []);

  // MediaPipe 얼굴 감지 초기화 (원래 작동하던 방식으로 복원)
  useEffect(() => {
    const initializeFaceDetection = async () => {
      try {
        const faceDetection = new FaceDetection({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
          }
        });

        faceDetection.setOptions({
          model: 'short',
          minDetectionConfidence: 0.5,
        });

        faceDetection.onResults((results) => {
          if (results.detections && results.detections.length > 0) {
            const detections: FaceDetectionResult[] = results.detections.map((detection) => {
              return {
                x: detection.boundingBox.xCenter * 100,
                y: detection.boundingBox.yCenter * 100,
                width: detection.boundingBox.width * 100,
                height: detection.boundingBox.height * 100,
                confidence: 0.8,
              };
            });
            
            setFaceDetections(detections);
            updateFaceTrackingStickers(detections);
          } else {
            setFaceDetections([]);
          }
        });

        faceDetectionRef.current = faceDetection;
      } catch (error) {
        console.error('MediaPipe 초기화 실패:', error);
      }
    };

    initializeFaceDetection();

    return () => {
      if (faceDetectionRef.current) {
        faceDetectionRef.current.close();
      }
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, [updateFaceTrackingStickers]);

  // 웹캠이 로드되면 MediaPipe 카메라 시작 (원래 방식)
  const handleUserMedia = useCallback((stream: MediaStream) => {
    if (webcamRef.current?.video) {
      videoRef.current = webcamRef.current.video;
      
      if (faceDetectionRef.current && isFaceDetectionEnabled) {
        const camera = new Camera(videoRef.current, {
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
  }, [isFaceDetectionEnabled]);

  // 얼굴 감지 토글 (원래 방식)
  const toggleFaceDetection = () => {
    setIsFaceDetectionEnabled(prev => !prev);
    
    if (!isFaceDetectionEnabled && videoRef.current && faceDetectionRef.current) {
      const camera = new Camera(videoRef.current, {
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
    } else if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
      setFaceDetections([]);
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
    
    if (videoRef.current) {
      // 모든 스타일 초기화
      videoRef.current.style.filter = '';
      videoRef.current.style.webkitFilter = '';
      
      // 선택된 필터 적용
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

  // 얼굴 추적 스티커 추가
  const addFaceTrackingSticker = (emoji: string) => {
    if (faceDetections.length === 0) {
      alert('얼굴이 감지되지 않았습니다. 잠시 후 다시 시도해주세요!');
      return;
    }

    const face = faceDetections[0];
    const newSticker: Sticker = {
      id: Date.now().toString(),
      emoji,
      x: face.x - 15, // 스티커 크기를 고려해서 중심 맞춤
      y: Math.max(5, face.y - face.height * 0.4), // 10% 더 위로 (0.3 → 0.4)
      size: 300,
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

  const captureWithStickers = async (): Promise<string | null> => {
    if (!webcamRef.current || !canvasRef.current) return null;

    const webcamImage = webcamRef.current.getScreenshot();
    if (!webcamImage) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;

        if (currentFilter !== 'none' && FILTERS[currentFilter].style.filter) {
          ctx.filter = FILTERS[currentFilter].style.filter || 'none';
        } else {
          ctx.filter = 'none';
        }

        ctx.drawImage(img, 0, 0);

        ctx.filter = 'none';

        const containerRect = webcamContainerRef.current?.getBoundingClientRect();
        if (containerRect && stickers.length > 0) {
          stickers.forEach(sticker => {
            const stickerX = (sticker.x / 100) * canvas.width;
            const stickerY = (sticker.y / 100) * canvas.height;
            const scaleFactor = canvas.width / containerRect.width;
            const stickerSize = sticker.size * scaleFactor;

            ctx.font = `${stickerSize}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(sticker.emoji, stickerX, stickerY);
          });
        }

        if (currentFrame !== 'none') {
          const frameSrc = getCurrentFrameSrc(currentFrame);
          if (frameSrc) {
            const frameImg = new Image();
            frameImg.onload = () => {
              ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
              const dataURL = canvas.toDataURL('image/png');
              resolve(dataURL);
            };
            frameImg.onerror = () => {
              console.log(`프레임 로드 실패: ${frameSrc}`);
              const dataURL = canvas.toDataURL('image/png');
              resolve(dataURL);
            };
            frameImg.src = frameSrc;
            return;
          }
        }

        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.src = webcamImage;
    });
  };

  const capture = async () => {
    if (webcamRef.current && photos.length < MAX_PHOTOS) {
      let imageSrc: string | null = null;
      
      if (stickers.length > 0 || currentFrame !== 'none' || currentFilter !== 'none') {
        imageSrc = await captureWithStickers();
      } else {
        imageSrc = webcamRef.current.getScreenshot();
      }

      if (imageSrc) {
        setPhotos((prev) => [...prev, imageSrc]);
      }
    }
  };

  const downloadPhoto = (photoSrc: string, index: number) => {
    const link = document.createElement('a');
    link.href = photoSrc;
    link.download = `photobooth-${index + 1}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deletePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    setSelectedPhotoIndex(null);
  };

  const openPhotoModal = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closePhotoModal = () => {
    setSelectedPhotoIndex(null);
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedPhotoIndex !== null) {
        closePhotoModal();
      }
    };

    if (selectedPhotoIndex !== null) {
      document.addEventListener('keydown', handleEscKey);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [selectedPhotoIndex]);

  // 카메라 전환 함수
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
              🔄 {facingMode === 'user' ? '후면' : '전면'}
            </CameraSwitchButton>
            <PhotoCount>
              {photos.length}/{MAX_PHOTOS}장
            </PhotoCount>
            <CaptureButton 
              onClick={capture}
              disabled={photos.length >= MAX_PHOTOS}
            >
              <svg viewBox="-0.5 -0.5 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path stroke="currentColor" d="M5.625 8.125a1.875 1.875 0 1 0 3.75 0 1.875 1.875 0 1 0 -3.75 0" strokeWidth="1"></path>
                <path d="M6.1111125 13.125h2.7777625c1.9506875000000001 0 2.926 0 3.6266249999999998 -0.45962500000000006 0.30325 -0.199 0.5636875 -0.4546875 0.766375 -0.7524375 0.468125 -0.687875 0.468125 -1.6455 0.468125 -3.5606875 0 -1.915125 0 -2.87274375 -0.468125 -3.560625 -0.2026875 -0.2977875 -0.463125 -0.553475 -0.766375 -0.7524500000000001 -0.45025000000000004 -0.29534375 -1.0138125 -0.40090624999999996 -1.8767500000000001 -0.4386375 -0.4118125 0 -0.7663125 -0.3063625 -0.8470624999999999 -0.7028125000000001C9.6705 2.30305625 9.1386875 1.875 8.5210625 1.875h-2.042125c-0.61765625 0 -1.14946875 0.42805625 -1.2706062500000002 1.022725 -0.08075625 0.39644999999999997 -0.4353 0.7028125000000001 -0.84708125 0.7028125000000001 -0.8629187500000001 0.03773125 -1.42653125 0.14329375 -1.876725 0.4386375 -0.30330625 0.19897499999999999 -0.563725 0.45466249999999997 -0.7663875 0.7524500000000001C1.25 5.47950625 1.25 6.437125 1.25 8.35225c0 1.9151874999999998 0 2.8728124999999998 0.4681375 3.5606875 0.2026625 0.29775 0.46308125 0.5534375 0.7663875 0.7524375C3.18515 13.125 4.16046875 13.125 6.1111125 13.125Z" stroke="currentColor" strokeWidth="1"></path>
                <path d="M11.875 6.25h-0.625" stroke="currentColor" strokeLinecap="round" strokeWidth="1"></path>
              </svg>
            </CaptureButton>
          </CaptureButtonContainer>
          
          <FaceDetectionToggle>
            <FaceToggleButton
              onClick={toggleFaceDetection}
              isActive={isFaceDetectionEnabled}
            >
              {isFaceDetectionEnabled ? '🔍 얼굴감지 ON' : '👀 얼굴감지 OFF'}
            </FaceToggleButton>
            {isFaceDetectionEnabled && faceDetections.length > 0 && (
              <FaceDetectionInfo>
                ✅ {faceDetections.length}개 얼굴 감지됨
              </FaceDetectionInfo>
            )}
          </FaceDetectionToggle>
          
          <WebcamWrapper ref={webcamContainerRef}>
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
            
            {/* 얼굴 감지 영역 표시 */}
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
            
            {stickers.map(sticker => (
              <StickerOverlay
                key={sticker.id}
                style={{
                  left: `${sticker.x}%`,
                  top: `${sticker.y}%`,
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
            ))}
            {currentFrame !== 'none' && (
              <FrameOverlay>
                <FrameImage 
                  src={getCurrentFrameSrc(currentFrame)}
                  alt="선택된 프레임"
                  onError={(e) => {
                    console.log('프레임 이미지 로드 실패:', e);
                    setCurrentFrame('none');
                  }}
                />
              </FrameOverlay>
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
                Filter
              </TabButton>
              <TabButton 
                isActive={activeTab === 'sticker'} 
                onClick={() => setActiveTab('sticker')}
              >
                Sticker
              </TabButton>
              <TabButton 
                isActive={activeTab === 'frame'} 
                onClick={() => setActiveTab('frame')}
              >
                Frame
              </TabButton>
            </TabNavigation>

            <TabContent>
              {activeTab === 'filter' && (
                <FilterSection>
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
                </FilterSection>
              )}

              {activeTab === 'sticker' && (
                <StickerSection>
                  <StickerSubTitle>일반 스티커</StickerSubTitle>
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
                  
                  <StickerSubTitle>🎯 얼굴 추적 스티커</StickerSubTitle>
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
                  </StickerGrid>
                  
                  <ClearStickersButton onClick={() => setStickers([])}>
                    모든 스티커 삭제
                  </ClearStickersButton>
                </StickerSection>
              )}

              {activeTab === 'frame' && (
                <FrameSection>
                  <FrameGrid>
                    {frameOptionsWithSrc.map((frame) => (
                      <FrameButton
                        key={frame.id}
                        onClick={() => setCurrentFrame(frame.id)}
                        isSelected={currentFrame === frame.id}
                        title={frame.name}
                      >
                        {frame.id === 'none' ? (
                          <NoFrameIndicator>없음</NoFrameIndicator>
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
                </FrameSection>
              )}
            </TabContent>
          </TabContainer>
        </WebcamContainer>
        <PhotoGrid>
          {photos.map((photo, index) => (
            <PhotoItem 
              key={index} 
              src={photo} 
              alt={`촬영된 사진 ${index + 1}`}
              onClick={() => openPhotoModal(index)}
            />
          ))}
          {[...Array(MAX_PHOTOS - photos.length)].map((_, index) => (
            <EmptyPhotoItem key={`empty-${index}`} />
          ))}
        </PhotoGrid>
      </Content>

      {selectedPhotoIndex !== null && (
        <PhotoModal onClick={closePhotoModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <CloseButton onClick={closePhotoModal}>×</CloseButton>
            </ModalHeader>
            <ModalImageContainer>
              <ModalImage 
                src={photos[selectedPhotoIndex]} 
                alt={`사진 ${selectedPhotoIndex + 1}`}
              />
            </ModalImageContainer>
            <ModalActions>
              <ActionButton 
                $primary
                onClick={() => downloadPhoto(photos[selectedPhotoIndex], selectedPhotoIndex)}
              >
               Download
              </ActionButton>
              <ActionButton 
                $danger
                onClick={() => {
                    deletePhoto(selectedPhotoIndex);
                }}
              >
                Delete
              </ActionButton>
              <ActionButton onClick={closePhotoModal}>
                Close
              </ActionButton>
            </ModalActions>
          </ModalContent>
        </PhotoModal>
      )}
    </Container>
  );
};

const Container = styled.div({
  width: '100%',
  minHeight: '100vh',
  padding: '2rem',
  backgroundColor: '#eee',
  '@media (max-width: 768px)': {
    padding: '1rem 0.5rem',
  },
});

const Title = styled.h1({
  fontFamily: 'PPEditorialNew',
  fontSize: '3rem',
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#df3b3a',
});

const Content = styled.div({
  maxWidth: '1200px',
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
  padding: '0.8rem 1rem',
  margin: '0.5rem',
  fontSize: '0.8rem',
  fontWeight: 800,
  color: isActive ? '#f8e4e2' : '#333',
  backgroundColor: isActive ? '#df3b3a' : '#ffffff',
  border: `1px solid ${isActive ? '#df3b3a' : '#dee2e6'}`,
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: isActive ? '#df3b3a' : '#f8f9fa',
    color: isActive ? '#f8e4e2' : '#df3b3a',
    borderColor: '#df3b3a',
  },
}));

const TabContent = styled.div({
  padding: '1rem',
  height: '160px',
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
});

const StickerSection = styled.div({
  width: '100%',
});

const FrameSection = styled.div({
  width: '100%',
});

const PhotoGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '0.5rem',
  padding: '1rem',
  backgroundColor: '#fff',
  borderRadius: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const PhotoItem = styled.img({
  width: '100%',
  aspectRatio: '1',
  objectFit: 'cover',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
});

const EmptyPhotoItem = styled.div({
  width: '100%',
  aspectRatio: '1',
  backgroundColor: '#f1f3f5',
  borderRadius: '8px',
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

const FrameContainer = styled.div({
  width: '100%',
  marginTop: '1rem',
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
});

const FrameTitle = styled.h3({
  fontSize: '1.1rem',
  fontWeight: '600',
  marginBottom: '0.5rem',
  color: '#333',
  textAlign: 'center',
});

const FrameGrid = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  justifyContent: 'center',
});

const FrameButton = styled.button<{ isSelected: boolean }>(({ isSelected }) => ({
  padding: '0.5rem 1rem',
  minWidth: '100px',
  height: '60px',
  border: `2px solid ${isSelected ? '#df3b3a' : '#dee2e6'}`,
  borderRadius: '8px',
  backgroundColor: isSelected ? '#df3b3a' : '#ffffff',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  fontSize: '0.7rem',
  fontWeight: isSelected ? '600' : '400',
  color: isSelected ? '#f8e4e2' : '#333',
  '&:hover': {
    backgroundColor: '#df3b3a',
    borderColor: '#df3b3a',
    color: '#f8e4e2',
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
  width: '20px',
  height: '20px',
  border: '1px dashed #ccc',
  borderRadius: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.6rem',
  color: '#666',
  marginBottom: '0.25rem',
});

const PhotoModal = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '1rem',
});

const ModalContent = styled.div({
  backgroundColor: '#fff',
  borderRadius: '12px',
  maxWidth: '95vw',
  maxHeight: '95vh',
  width: 'auto',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
});

const ModalHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 1.5rem',
  borderBottom: '1px solid #eee',
  backgroundColor: '#f8f9fa',
});

const CloseButton = styled.button({
  width: '32px',
  height: '32px',
  border: 'none',
  borderRadius: '50%',
  backgroundColor: '#e9ecef',
  color: '#666',
  fontSize: '20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#dee2e6',
    color: '#333',
  },
});

const ModalImageContainer = styled.div({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  minHeight: '60vh',
});

const ModalImage = styled.img({
  width: '80vmin',
  height: '80vmin',
  objectFit: 'cover',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  '@media (max-width: 768px)': {
    width: '90vmin',
    height: '90vmin',
  },
});

const ModalActions = styled.div({
  display: 'flex',
  gap: '0.5rem',
  padding: '1rem 1.5rem',
  borderTop: '1px solid #eee',
  backgroundColor: '#fff',
});

const ActionButton = styled.button<{ $primary?: boolean; $danger?: boolean }>(({ $primary, $danger }) => ({
  flex: 1,
  padding: '0.75rem 1rem',
  fontSize: '0.8rem',
  fontWeight: '500',
  border: $primary ? 'none' : $danger ? 'none' : '1px solid #dee2e6',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: $primary ? '#df3b3a' : $danger ? '#dc3545' : '#ffffff',
  color: $primary ? '#f8e4e2' : $danger ? '#fff' : '#333',
  '&:hover': {
    backgroundColor: $primary ? '#f8e4e2' : $danger ? '#c82333' : '#f8f9fa',
    color: $primary ? '#df3b3a' : $danger ? '#fff' : '#333',
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const CaptureButtonContainer = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1rem',
  width: '100%',
});

const PhotoCount = styled.span({
  position: 'absolute',
  right: 0,
  fontSize: '0.8rem',
  color: '#666',
});

const CaptureButton = styled.button({
  padding: '0.8rem 2rem',
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#df3b3a',
  backgroundColor: '#f8e4e2',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  width: '100px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover:not(:disabled)': {
    backgroundColor: '#df3b3a',
    color: '#f8e4e2',
    transform: 'scale(1.1)',
  },
  '&:disabled': {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
});

const FilterButton = styled.button<{ isSelected: boolean }>(({ isSelected }) => ({
  padding: '0.5rem 1rem',
  fontSize: '0.8rem',
  fontWeight: isSelected ? '600' : '400',
  color: isSelected ? '#f8e4e2' : '#333',
  backgroundColor: isSelected ? '#df3b3a' : '#ffffff',
  border: `1px solid ${isSelected ? '#df3b3a' : '#dee2e6'}`,
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#df3b3a',
    color: '#f8e4e2',
    borderColor: '#df3b3a',
  },
}));

const StickerGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(32px, 1fr))',
  gap: '0.1rem',
  marginBottom: '0.8rem',
});

const StickerButton = styled.button({
  width: '32px',
  height: '32px',
  fontSize: '18px',
  border: `1px solid #dee2e6`,
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#df3b3a',
    borderColor: '#df3b3a',
    transform: 'scale(1.05)',
  },
});

const ClearStickersButton = styled.button({
  width: '100%',
  padding: '0.5rem',
  fontSize: '0.8rem',
  color: '#333',
  backgroundColor: '#ffffff',
  border: `1px solid #dee2e6`,
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#df3b3a',
    color: '#f8e4e2',
    borderColor: '#df3b3a',
  },
});

const FaceDetectionToggle = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem',
});

const FaceToggleButton = styled.button<{ isActive: boolean }>(({ isActive }) => ({
  padding: '0.4rem 0.8rem',
  fontSize: '0.7rem',
  fontWeight: '600',
  color: isActive ? '#f8e4e2' : '#333',
  backgroundColor: isActive ? '#df3b3a' : '#ffffff',
  border: `1px solid ${isActive ? '#df3b3a' : '#dee2e6'}`,
  borderRadius: '15px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#df3b3a',
    color: '#f8e4e2',
    borderColor: '#df3b3a',
  },
}));

const FaceDetectionInfo = styled.span({
  fontSize: '0.7rem',
  color: '#28a745',
  fontWeight: '500',
});

const FaceDetectionBox = styled.div({
  position: 'absolute',
  border: '2px solid #df3b3a',
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

const StickerSubTitle = styled.h4({
  fontSize: '0.7rem',
  fontWeight: '600',
  color: '#333',
  marginBottom: '0.3rem',
  marginTop: '0.5rem',
  '&:first-of-type': {
    marginTop: '0',
  },
});

const FaceTrackingStickerButton = styled.button<{ disabled?: boolean }>(({ disabled }) => ({
  width: '32px',
  height: '32px',
  fontSize: '18px',
  border: `2px solid ${disabled ? '#ccc' : '#df3b3a'}`,
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
    backgroundColor: '#df3b3a',
    borderColor: '#df3b3a',
    transform: 'scale(1.05)',
  },
  '&:after': disabled ? {} : {
    content: '"🎯"',
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    fontSize: '8px',
  },
}));

const CameraSwitchButton = styled.button({
  position: 'absolute',
  left: 0,
  padding: '0.4rem 0.8rem',
  fontSize: '0.7rem',
  fontWeight: '600',
  color: '#323232',
  backgroundColor: '#ffffff',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});

export default PhotoBooth; 