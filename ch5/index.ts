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
  const scene = new THREE.Scene();
  // 포그 추가
  // 지오메트리
  //// 수직 평면 만들기
  //// 상자 생성
  const cubeSize = 4;
  const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  //// 구 만들기
  // 재질 및 질감
  const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 'pink',
  });
  // 조명
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  scene.add(light);
  // 메시(MESH)
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(cubeSize + 1, cubeSize + 1, 0);
  scene.add(cube);
  // 그리기
  const draw = () => {
    if (resizeGLToDisplaySize(gl)) {
      const canvas = gl.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    gl.render(scene, camera);
    requestAnimationFrame(draw);
  };
  // 애니메이션 루프 설정
  // 크기 조정
  requestAnimationFrame(draw);
};

const resizeGLToDisplaySize = (gl: THREE.WebGLRenderer) => {
  const canvas = gl.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    gl.setSize(width, height, false);
  }
  return needResize;
};

main();
