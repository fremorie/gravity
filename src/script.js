import { Scene, Clock } from 'three'
import { OrbitControls } from 'three/addons'

import { createFloorMesh } from './meshes'
import { ambientLight, directionalLight } from './lights'
import { handleResize } from './resize'
import { createCamera } from './camera'
import { createRenderer } from './renderer'
import { world } from './world'
import { ObjectGenerator } from './objectGenerator'
import { createFloorBody } from './worldBodies'

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl')
const scene = new Scene()

const store = []
const objectGenerator = new ObjectGenerator({
    scene,
    world,
    store,
})

for (let i = 0; i < 10; i++) {
    objectGenerator.createBox({
        dimensions: {
            width: Math.random(),
            height: Math.random(),
            depth: Math.random(),
        },
        position: {
            x: Math.random(),
            y: Math.random(),
            z: Math.random(),
        }
    })

    objectGenerator.createSphere({
        radius: Math.random(),
        position: {
            x: Math.random(),
            y: Math.random(),
            z: Math.random(),
        }
    })
}

/**
 * Floor
 */
const floor = createFloorMesh()
scene.add(floor)

const floorBody = createFloorBody()
world.addBody(floorBody)

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
const clock = new Clock()
let oldElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    // Update physics world
    world.step(1 / 60, deltaTime, 3)

    for (const object of store) {
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()