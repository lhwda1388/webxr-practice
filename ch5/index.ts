import * as THREE from 'three';
import pebbles from './textures/pebbles.jpg';
import sphereNormal from './textures/sphere_normal.png';
import pebbleGray from './textures/pebbies_gray.png';
import pebbleNormal from './textures/pebbles_normal.png';

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
  scene.background = new THREE.Color(0.3, 0.5, 0.8);
  // 포그 추가
  const fog = new THREE.Fog('gray', 1, 100);
  scene.fog = fog;
  // 지오메트리
  //// 수직 평면 만들기
  const planeWidth = 256;
  const planeHeight = 128;
  const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
  //// 상자 생성
  const cubeSize = 4;
  const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  //// 구 만들기
  const sphereRaduis = 3;
  const sphereWidthSegments = 32;
  const sphereHeightSegments = 16;
  const sphereGeometry = new THREE.SphereGeometry(
    sphereRaduis,
    sphereWidthSegments,
    sphereHeightSegments,
  );

  // 재질 및 질감
  const textureLoader = new THREE.TextureLoader();

  const cubeTextureMap = textureLoader.load(pebbleGray);

  const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 'pink',
    map: cubeTextureMap,
  });

  const planeTextureMap = textureLoader.load(
    // resource URL
    pebbles,
  );
  planeTextureMap.wrapS = THREE.RepeatWrapping;
  planeTextureMap.wrapT = THREE.RepeatWrapping;
  planeTextureMap.repeat.set(16, 16);
  planeTextureMap.minFilter = THREE.NearestFilter;
  // planeTextureMap.anisotropy = gl.getMaxAnisotropy();

  const planeNormalMap = textureLoader.load(
    // resource URL
    pebbleNormal,
  );
  planeNormalMap.wrapS = THREE.RepeatWrapping;
  planeNormalMap.wrapT = THREE.RepeatWrapping;
  planeNormalMap.minFilter = THREE.NearestFilter;
  planeNormalMap.repeat.set(16, 16);

  const planeMaterial = new THREE.MeshStandardMaterial({
    map: planeTextureMap,
    side: THREE.DoubleSide,
    normalMap: planeNormalMap,
  });

  const sphereNormalMap = textureLoader.load(sphereNormal);
  sphereNormalMap.wrapS = THREE.RepeatWrapping;
  sphereNormalMap.wrapT = THREE.RepeatWrapping;

  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 'tan',
    normalMap: sphereNormalMap,
  });

  // 메시(MESH)
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(cubeSize + 1, cubeSize + 1, 0);
  scene.add(cube);

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(-sphereRaduis - 1, sphereRaduis + 2, 0);
  scene.add(sphere);

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = Math.PI / 2;
  scene.add(plane);

  // 조명
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(0, 30, 30);
  light.target = plane;
  scene.add(light);
  scene.add(light.target);
  // 주변 조명
  const ambientColor = 0xffffff;
  const ambientIntensity = 0.2;
  const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
  scene.add(ambientLight);
  // 그리기
  const draw = (time) => {
    time *= 0.001;
    if (resizeGLToDisplaySize(gl)) {
      const canvas = gl.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.01;
    light.position.x = 20 * Math.cos(time);
    light.position.y = 20 * Math.sin(time);

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
