import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  45, //视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 设置惯性

// 创建几何体
const geometry = new THREE.BufferGeometry();
// 使用索引绘制
const vertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
]);
// 创建顶点属性
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
// 创建顶点属性
geometry.setIndex([0, 1, 2, 2, 3, 0])

// 设置2个顶点组，形成2个材质
geometry.addGroup(0, 3, 0);
geometry.addGroup(3, 3, 1);

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  // side: THREE.DoubleSide
  wireframe: true,
});
const material1 = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const cube = new THREE.Mesh(geometry, [material, material1]);
scene.add(cube);

const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material0 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const material2 = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
});
const material3 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const material4 = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
});
const material5 = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
});
const cube1 = new THREE.Mesh(geometry1, [material0, material1, material2, material3, material4, material5]);
cube1.position.x = 2
scene.add(cube1);

// 设置相机位置
camera.position.z = 5;
camera.position.x = 2;
camera.position.y = 2;
camera.lookAt(0, 0, 0);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 渲染函数
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// 监听窗口的变化
window.addEventListener("resize", () => {
  // 重置渲染器宽高比
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 重置相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机投影矩阵
  // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
  camera.updateProjectionMatrix();
});
