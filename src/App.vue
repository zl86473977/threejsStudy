<script setup>
import * as THREE from "three"
// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// 设置父元素材质为线框模式
parentMaterial.wireframe = true;

// 创建网格
const parentCube = new THREE.Mesh(geometry, parentMaterial);
const cube = new THREE.Mesh(geometry, material);

parentCube.add(cube);
parentCube.position.set(-3, 3, 0);
cube.position.set(3, 0, 0);
// 绕着x轴旋转
cube.rotation.x = Math.PI / 4;

// 添加到场景中
scene.add(parentCube);

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

const eventObj = {
  Fullscreen() {
    document.body.requestFullscreen();
  },
  ExitFullscreen() {
    document.exitFullscreen();
  }
}
// 创建GUI
const gui = new GUI();
// 添加按钮
gui.add(eventObj, "Fullscreen").name("全屏");
gui.add(eventObj, "ExitFullscreen").name("退出全屏");
// 控制立方体的位置
let folder = gui.addFolder("立方体位置");
folder.add(cube.position, "x", -10, 10, 1).name("立方体x轴坐标").onChange((x) => {
  console.log(x);
});
folder.add(cube.position, "y", -10, 10, 1).name("立方体y轴坐标").onFinishChange((y) => {
  console.log(y);
});
folder.add(cube.position, "z", -10, 10, 1).name("立方体z轴坐标");

gui.add(parentMaterial, "wireframe").name("父元素线框模式")
gui.addColor(material, "color").name("子元素颜色")

</script>

<template>
  <div style="position: relative;z-index: 1;">
  </div>
</template>

<style></style>
