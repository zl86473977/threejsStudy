<script setup>
import * as THREE from "three"
// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入hdr加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 导入lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

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

// 创建纹理加载器
let textureLoader = new THREE.TextureLoader();
// 加载纹理
let texture = textureLoader.load('./jpg/flower.png'); 
// texture.colorSpace = THREE.SRGBColorSpace;
texture.colorSpace = THREE.NoColorSpace;
// 加载ao贴图
// let aoTexture = textureLoader.load('./jpg/flower_ao.jpg');
// 透明度贴图
// let alphaTexture = textureLoader.load('./jpg/flower_alpha.jpg');
// 光照贴图
// let lightTexture = textureLoader.load('./jpg/flower_light.jpg');
// 高光贴图
// let hightTexture = textureLoader.load('./jpg/flower_hight.jpg');
// rbgeLoader加载hdr图片
let rgbeLoader = new RGBELoader();
rgbeLoader.load('./hdr/sky_linekotsi_01_HDRI.hdr', (envMap) => {
  // 设置球形贴图
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  // 设置环境贴图
  scene.background = envMap;
  scene.environment = envMap;
  // 设置plane的环境贴图
  plainMaterial.envMap = envMap;
});

let plainGeometry = new THREE.PlaneGeometry(2, 2);
let plainMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: texture,
  side: THREE.DoubleSide,
  transparent: true,
  // 设置ao贴图
  // aoMap: aoTexture
  // 设置透明度贴图
  // alphaMap: alphaTexture
  // 设置光照贴图
  // lightMap: lightTexture
  // 设置高光贴图
  // specularMap: hightTexture
  // 设置反射程度
  // reflectivity: 0.5
});
let plain = new THREE.Mesh(plainGeometry, plainMaterial);
scene.add(plain);

// 设置相机位置
camera.position.x = 5;
camera.position.y = 10;
camera.position.z = 10;
camera.lookAt(0, 0, 0);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 添加控制器
// 这边第二个参数传document.body会导致下面的全屏无法触发
const controls = new OrbitControls(camera, renderer.domElement);

// 渲染
renderer.render(scene, camera);

// 渲染函数
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// 画布自适应窗口
window.addEventListener("resize", () => {
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 重置相机的宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机的投影矩阵
  camera.updateProjectionMatrix();
});

// 初始化gui
const gui = new GUI();
gui.add(texture, 'colorSpace', {
  No: THREE.NoColorSpace,
  sRGB: THREE.SRGBColorSpace,
  Linear: THREE.LinearSRGBColorSpace
}).onChange(() => {
  texture.needsUpdate = true;
});
</script>

<template>
  <div style="position: relative;z-index: 1;">
  </div>
</template>

<style></style>
