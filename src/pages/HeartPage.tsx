import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import styled from "@emotion/styled";

const Section = styled.section`
  height: 200vh; // 스크롤 영역 확보
  position: relative;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 300px;
  width: 100%;
`;

const ScreenCanvas = styled(Canvas)`
  width: 100vw;
  height: 300px;
  pointer-events: none;
`;

const RotatingHeart: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (meshRef.current) {
        // 섹션 내에서의 스크롤 진행도 계산
        const section = document.querySelector(".heart-section");
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight - window.innerHeight;

        // 섹션 내 스크롤 진행도 (0~1)
        let progress = -sectionTop / sectionHeight;
        progress = Math.max(0, Math.min(1, progress));

        // 첫 1/3에서만 회전하도록 조정
        const rotationProgress = Math.min(progress * 3, 1);
        meshRef.current.rotation.y = rotationProgress * Math.PI * 4; // 2바퀴 회전
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <mesh ref={meshRef} scale={[0.2, 0.2, 0.2]} rotation={[Math.PI, 0, 0]}>
      <HeartGeometry />
      <meshStandardMaterial
        color="#E91E63" // 순수한 빨간색
        roughness={0.2} // 더 반짝이는 효과
        metalness={0.9} // 금속성 증가
        emissive="#FF0000" // 빛나는 효과
        emissiveIntensity={0.3} // 발광 강도
      />
    </mesh>
  );
};

const HeartGeometry: React.FC = () => {
  const heartShape = React.useMemo(() => {
    const shape = new THREE.Shape();

    // 시작점
    shape.moveTo(0, 10);

    // 왼쪽 위 곡선
    shape.bezierCurveTo(-4, -1, 2, -8, 7, -8);

    // 오른쪽 위 곡선
    shape.bezierCurveTo(14, -8, 15, -2, 14, 1);

    // 오른쪽 아래로 내려오는 곡선
    shape.bezierCurveTo(13, 4, 11, 6, 7, 9);

    // 중앙 아래 곡선
    shape.bezierCurveTo(4, 11, 1, 13, 0, 13);

    // 왼쪽 아래 곡선
    shape.bezierCurveTo(-1, 13, -4, 11, -7, 9);

    // 왼쪽 위로 올라가는 곡선
    shape.bezierCurveTo(-11, 6, -13, 4, -14, 1);

    // 왼쪽 상단 마무리 곡선
    shape.bezierCurveTo(-15, -2, -14, -8, -7, -8);

    // 중앙 상단으로 연결
    shape.bezierCurveTo(-2, -8, 4, -1, 0, 10);

    return shape;
  }, []);

  const geometry = React.useMemo(() => {
    const extrudeSettings = {
      depth: 3, // 두께 증가 (기존 0.5)
      bevelEnabled: true,
      bevelThickness: 3, // 베벨 두께 증가 (기존 0.1)
      bevelSize: 2, // 베벨 크기 증가 (기존 0.1)
      bevelSegments: 10, // 베벨 세그먼트 증가 (더 부드러운 모서리)
      bevelOffset: 0, // 베벨 오프셋
    };
    return new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  }, [heartShape]);

  return <primitive object={geometry} />;
};

const HeartPage: React.FC = () => {
  return (
    <Section className="heart-section">
      <StickyContainer>
        <ScreenCanvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ touchAction: "none" }}
        >
          {/* 전체적인 환경광 - 더 어둡게 해서 다른 조명이 잘 보이게 */}
          <ambientLight intensity={0.1} color="#ffffff" />

          {/* 메인 조명 - 강도 증가 */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={2.0}
            color="#ffffff"
          />

          {/* 반대편 보조 조명 - 빨간빛 강화 */}
          <directionalLight
            position={[-5, -5, -5]}
            intensity={1.0}
            color="#ff6666"
          />

          {/* 위에서 비추는 조명 - 더 집중된 빛 */}
          <spotLight
            position={[0, 10, 2]}
            angle={0.3}
            penumbra={0.7}
            intensity={2.0}
            color="#ffffff"
            distance={20}
          />

          {/* 하트 주변에 포인트 라이트 - 더 강한 빨간 빛 */}
          <pointLight
            position={[0, 0, 3]}
            intensity={1.0}
            distance={8}
            decay={1.5}
            color="#ff3333"
          />
          <RotatingHeart />
        </ScreenCanvas>
      </StickyContainer>
    </Section>
  );
};

export default HeartPage;
