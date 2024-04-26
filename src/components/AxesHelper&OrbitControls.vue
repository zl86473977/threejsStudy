<script setup>
import * as THREE from "three"
// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  45, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建网格
const cube = new THREE.Mesh(geometry, material);

// 添加到场景中
scene.add(cube);

// 设置相机位置
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;
camera.lookAt(0, 0, 0);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 添加控制器
// const controls = new OrbitControls(camera, renderer.domElement); 
const controls = new OrbitControls(camera, document.body);
// 设置控制器阻尼
controls.enableDamping = true;
// 设置阻尼系数
controls.dampingFactor = 0.05;
// 设置自动旋转
controls.autoRotate = true;
// 设置旋转速度
controls.rotateSpeed = 0.5;

//controls.update() must be called after any manual changes to the camera's transform
// camera.position.set( 0, 20, 10 ); // 手动调整相机位置
// controls.update();如果不调用，则会导致黑屏

// 渲染
renderer.render(scene, camera);

// 渲染函数
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
</script>

<template>
  <div>
  </div>
</template>

<style></style>
