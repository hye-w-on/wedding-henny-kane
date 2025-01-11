import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styled from "@emotion/styled";

const ScreenCanvas = styled(Canvas)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw; /* 뷰포트 가로 전체 */
  height: 100vh; /* 뷰포트 세로 전체 */
`;
const Heart: React.FC = () => {
  return (
    <mesh>
      <HeartGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

const HeartGeometry: React.FC = () => {
  const heartShape = React.useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0); // 하트의 시작점
    shape.bezierCurveTo(0, 0.8, -1, 1, -1.2, 0.2); // 왼쪽 곡선
    shape.bezierCurveTo(-1.3, 0, -0.7, -1, 0, -1.4); // 하트의 아래
    shape.bezierCurveTo(1, -1.2, 1.5, 0, 1, 0.5); // 오른쪽 곡선
    shape.bezierCurveTo(0.5, 1.2, 0, 0.8, 0, 0.5); // 오른쪽 상단
    return shape;
  }, []);

  const geometry = React.useMemo(() => {
    const extrudeSettings = {
      depth: 0.5, // 하트의 두께
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 3,
    };
    return new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  }, [heartShape]);

  return <primitive object={geometry} />;
};

const HeartPage: React.FC = () => {
  return (
    <ScreenCanvas camera={{ position: [0, 0, 5], fov: 75 }}>
      {/* 조명 추가 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />

      {/* 입체 하트 */}
      <Heart />

      {/* 카메라 이동을 위한 컨트롤 */}
      <OrbitControls />
    </ScreenCanvas>
  );
};

export default HeartPage;
