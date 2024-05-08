<script setup>
import * as THREE from "three"
// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入hdr加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 导入gltf加载器
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// 导入draco解码器
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

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



// 实例化加载器gltf加载器
// const gltfLoader = new GLTFLoader();
// gltfLoader.load("./gltf/snow.glb", (gltf) => {
//     console.log(gltf)
//     scene.add(gltf.scene);
// });
// // 实例化 draco解码器
// const dracoLoader = new DRACOLoader();
// // 设置draco解码器路径
// dracoLoader.setDecoderPath("./draco/");
// // 设置gltf加载器的draco解码器
// gltfLoader.setDRACOLoader(dracoLoader);

// rbgeLoader加载hdr图片
// let rgbeLoader = new RGBELoader();
// rgbeLoader.load('./hdr/sky_linekotsi_01_HDRI.hdr', (envMap) => {
//   // 设置球形贴图
//   envMap.mapping = THREE.EquirectangularReflectionMapping;
//   // 设置环境贴图
//   scene.background = envMap;
//   scene.environment = envMap;
// });

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

// 创建长方体
const boxGeometry = new THREE.BoxGeometry(1, 1, 100);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// 创建场景fog
// scene.fog = new THREE.Fog(0x999999, 0.1, 50);
// 创建场景指数fog
scene.fog = new THREE.FogExp2(0x999999, 0.1);
scene.background = new THREE.Color(0x999999);
</script>

<template>
  <div style="position: relative;z-index: 1;">
  </div>
</template>

<style></style>
