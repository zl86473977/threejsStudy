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

// 创建三角形
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0
])
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const indices = new Uint16Array([
  0, 1, 2,
  2, 3, 0
])
geometry.setIndex(new THREE.BufferAttribute(indices, 1));

// 设置2个定点组，形成2个材质
geometry.addGroup(0, 3, 0);
geometry.addGroup(3, 3, 1);

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // side: THREE.DoubleSide
  wireframe: true
});
const material1 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  // side: THREE.DoubleSide
  // wireframe: true
});
const triangle = new THREE.Mesh(geometry, [material, material1]);

console.log(geometry);
// 添加到场景中
scene.add(triangle);

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

</script>

<template>
  <div style="position: relative;z-index: 1;">
  </div>
</template>

<style></style>
