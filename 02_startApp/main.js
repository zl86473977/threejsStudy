import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
    45, //视角
    window.innerWidth / window.innerHeight, // 宽高比
    0.1,// 近平面
    1000, // 远平面
)

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // 设置惯性

// 创建几何体 24个顶点
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00});
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
// 设置父元素材质喂线框模式
parentMaterial.wireframe = true;

// 创建网格
const cube = new THREE.Mesh(geometry, material);
const parentCube = new THREE.Mesh(geometry, parentMaterial);
parentCube.position.x = -3;
cube.position.x = 3
parentCube.add(cube);
// 将网格添加到场景中
scene.add(parentCube);

// 设置相机位置
camera.position.z = 10;
camera.lookAt(0, 0, 0);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 渲染函数
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update()
    renderer.render(scene, camera);
}
animate()


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

let eventObj = {
    Fullscreen: function() {
        // 全屏
        document.body.requestFullscreen();
    },
    ExitFullscreen: function() {
        document.exitFullscreen();
    }
}

// 创建GUI
const gui = new GUI();
gui.add(eventObj, 'Fullscreen').name("全屏")
gui.add(eventObj, 'ExitFullscreen').name("退出全屏")

// 控制立方体的位置
gui.add(cube.position, "x", -3, 3).name("立方体x轴位置")
gui.add(cube.position, "x").min(-10).max(10).step(1).name("立方体x轴位置").onChange((val) => {
    console.log('x----onchange-----', val);
})
gui.add(cube.position, "y").min(-10).max(10).step(1).name("立方体y轴位置").onFinishChange((val) => {
    console.log('x----onfinishchange-----', val);
})
gui.add(cube.position, "z").min(-10).max(10).step(1).name("立方体z轴位置")

gui.add(parentMaterial, "wireframe").name("父元素线框模式");

let colorParams = {
    cubeColor: "#00ffff",
};
gui.addColor(colorParams, "cubeColor").name("立方体颜色").onChange((val) => {
    cube.material.color.set(val);
})

