import * as THREE from 'three'
import Stats from 'stats.js'

import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

const clock = new THREE.Clock()

// 场景
const scene = new THREE.Scene()

// 相机
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(10, 10, 10)
camera.lookAt(0, 0, 0)

// 渲染器
const canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
// renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.setPixelRatio(window.devicePixelRatio)

// 光线
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(30, 50, 40)
scene.add(light)

// 立方体
const cubeGeometry = new THREE.BoxGeometry(5, 5, 5)
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x0099cc })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0a912f })
const linePoints = [
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(10, 0, 0)
]
const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints)
const line = new THREE.Line(lineGeometry, lineMaterial)
scene.add(line)

// 坐标轴
const axesHelper = new THREE.AxesHelper(15)
scene.add(axesHelper)

const control = new FlyControls(camera, renderer.domElement)

// 使得渲染器的内容大小为显示容器的大小
function resizeRendererToDisplaySize (renderer) {
    const pixelRatio = window.devicePixelRatio
    const displayWidth = canvas.clientWidth * pixelRatio || 0
    const displayHeight = canvas.clientHeight * pixelRatio || 0
    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight
    if (needResize) {
        renderer.setSize(displayWidth, displayHeight, false)
    }
    return needResize
}

// 渲染
function animate (timeStamp) {
    requestAnimationFrame(animate)

    stats.begin()

    if (resizeRendererToDisplaySize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }
    
    const delta = clock.getDelta()

    const time = timeStamp * 0.001
    cube.rotation.x = time
    cube.rotation.y = time
    cube.rotation.z = time

    control.update(delta)

    renderer.render(scene, camera)

    stats.end()
}
animate()
