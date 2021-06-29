import * as THREE from 'three'
import Stats from 'stats.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'

RectAreaLightUniformsLib.init()

// 统计帧数
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

// 场景
const scene = new THREE.Scene()
const fog = new THREE.FogExp2(0x8CB6DE)
scene.background = new THREE.Color(0x8CB6DE)
scene.fog = fog

// 相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000)
camera.position.set(10, 10, 10)
camera.lookAt(0, 0, 0)

// 渲染器
const canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
// renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.setPixelRatio(window.devicePixelRatio)

// 光线
const mainLight = new THREE.DirectionalLight(0xffffff, 0.5)
mainLight.position.set(30, 50, 10)
mainLight.lookAt(0, 0, 0)
scene.add(mainLight)

const minorLight = new THREE.DirectionalLight(0xffffff, 0.5)
minorLight.position.set(-100, 50, -10)
scene.add(minorLight)

const topLight = new THREE.HemisphereLight(0x8CB6DE, 0x000000, 0.5)
topLight.position.set(0, 50, 0)
topLight.lookAt(0, 0, 0)
scene.add(topLight)

// 控制器
const control = new OrbitControls(camera, renderer.domElement)
control.enableDamping = true
control.dampingFactor = 0.1
control.maxPolarAngle = Math.PI / 2
control.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    RIGHT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY
}

// Collada加载.dae模型文件
const colladaLoader = new ColladaLoader()
colladaLoader.load('/assets/vibration_device/e_振动设备-烘培.dae', function (result) {
    console.log(result)
    const mesh = result.scene
    mesh.scale.set(0.05, 0.05, 0.05);
    mesh.position.set(0, 0, 0);
    scene.add(mesh)
})

// 使得渲染器的内容大小为显示容器的大小
function resizeRendererToDisplaySize (renderer) {
    const pixelRatio = window.devicePixelRatio
    const displayWidth = canvas.clientWidth * pixelRatio | 0
    const displayHeight = canvas.clientHeight * pixelRatio | 0
    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight
    if (needResize) {
        renderer.setSize(displayWidth, displayHeight, false)
    }
    return needResize
}

// 渲染
function animate (timeStamp) {
    stats.begin()

    if (resizeRendererToDisplaySize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }

    control.update()

    renderer.render(scene, camera)

    stats.end()

    requestAnimationFrame(animate)
}
animate()
