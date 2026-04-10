import { Scene } from 'three'
import { OrbitControls } from 'three/addons'

import { createFloorMesh, createSphereMesh } from './meshes'
import { ambientLight, directionalLight } from './lights'
import { handleResize } from './resize'
import { createCamera } from './camera'
import { createRenderer } from './renderer'
import { animateScene } from './animation'

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl')
const scene = new Scene()

/**
 * Test sphere
 */
const sphere = createSphereMesh()
scene.add(sphere)

/**
 * Floor
 */
const floor = createFloorMesh()
scene.add(floor)

/**
 * Lights
 */
scene.add(ambientLight)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    handleResize({
        sizes,
        camera,
        renderer,
    })
})

/**
 * Camera
 */
// Base camera
const camera = createCamera({
    aspectRatio: sizes.width / sizes.height,
})
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = createRenderer({
    canvas,
    sizes,
})

/**
 * Animate
 */

animateScene({
    controls,
    renderer,
    scene,
    camera,
})