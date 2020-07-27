import * as THREE from 'three'

// 场景
const scene = new THREE.Scene()

// 相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 10, 10)
camera.lookAt(0, 0, 0)

// 渲染器
const canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({canvas})
// renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.setPixelRatio(window.devicePixelRatio)

// 光线
const light = new THREE.DirectionalLight(0xffffff, 0.8)
light.position.set(10, 20, 10)
scene.add(light)

// 立方体
const cubeGeometry = new THREE.BoxGeometry(5, 5, 5)
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

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
    requestAnimationFrame(animate)
    
    if (resizeRendererToDisplaySize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }

    const time = timeStamp * 0.001
    cube.rotation.x = time
    cube.rotation.y = time
    renderer.render(scene, camera)
}
animate()