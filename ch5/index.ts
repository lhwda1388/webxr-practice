import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';
import { mat4 } from 'gl-matrix';
import * as THREE from 'three';

const main = () => {
  // 콘텍스트 생성
  const canvas = document.getElementById('c');
  const gl = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });

  // 카메라 생성 및 설정
  const angleOfView = 55;
  const aspectRatio = canvas.clientWidth / canvas.clientHeight;
  const nearPlane = 0.1;
  const farPlane = 100;
  const camera = new THREE.PerspectiveCamera(
    angleOfView,
    aspectRatio,
    nearPlane,
    farPlane,
  );

  camera.position.set(0, 8, 30);
  // 장면 생성
  // 포그 추가
  // 지오메트리
  // 수직 평면 만들기
  // 상자 생성
  // 구 만들기
  // 재질 및 질감
  // 조명
  // 메시(MESH)
  // 그리기
  // 애니메이션 루프 설정
  // 크기 조정
};

main();
