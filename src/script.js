import { Scene, Clock, Fog } from 'three'
import { OrbitControls } from 'three/addons'

import { createFloorMesh } from './meshes'
import { ambientLight, directionalLight } from './lights'
import { handleResize } from './resize'
import { createCamera } from './camera'
import { createRenderer } from './renderer'
import { world } from './world'
import { ObjectGenerator } from './objectGenerator'
import { createFloorBody } from './worldBodies'
import { gui, debugObject } from './debug'
import { defaultContactMaterial } from './worldMaterials'
import { FOG_FAR } from './config'
import { boxMaterial, sphereMaterial } from './materials'

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl')
const scene = new Scene()
scene.fog = new Fog(0x000000, 10, FOG_FAR)

const store = []
const objectGenerator = new ObjectGenerator({
    scene,
    world,
    store,
})

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

    for (let i = 0; i < store.length; i++) {
        const object = store[i]

        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)

        // Remove the object if it's no longer visible
        // so that it doesn't fall down for all eternity
        if (object.mesh.position.y < -FOG_FAR) {
            scene.remove(object.mesh)
            world.removeBody(object.body)
            store.splice(i, 1)
        }

    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

/**
 * Debug
 */
debugObject.reset = () => {
    objectGenerator.reset()
}

debugObject.createSphere = () => {
    objectGenerator.createSphere({
        radius: Math.random() * 0.5,
        position: {
            x: (Math.random() - 0.5) * 3,
            y: 3,
            z: (Math.random() - 0.5) * 3
        },
    })
}

debugObject.createBox = () => {
    objectGenerator.createBox({
        dimensions: {
            width: Math.random(),
            height: Math.random(),
            depth: Math.random(),
        },
        position: {
            x: (Math.random() - 0.5) * 3,
            y: 3,
            z: (Math.random() - 0.5) * 3
        },
    })
}

debugObject.createCylinder = () => {
    objectGenerator.createCylinder({
        radius: Math.random() / 2,
        position: {
            x: (Math.random() - 0.5) * 3,
            y: 3,
            z: (Math.random() - 0.5) * 3
        },
    })
}

gui.add(debugObject, 'createSphere')
    .name('Create sphere')

gui.add(debugObject, 'createBox')
    .name('Create box')

gui.add(debugObject, 'createCylinder')
    .name('Create cylinder')

gui.add(debugObject, 'reset')
    .name('Reset')

gui.add(debugObject, 'wireframe')
    .name('Wireframe')
    .onChange(() => {
        for (const object of store) {
            object.mesh.material.wireframe = debugObject.wireframe
        }
    })

gui.add(debugObject, 'friction')
    .min(0)
    .max(1)
    .step(0.01)
    .name('Friction')
    .onFinishChange(() => {
        defaultContactMaterial.friction = debugObject.friction
        console.log(world.defaultContactMaterial)
    })

gui.add(debugObject, 'restitution')
    .min(0)
    .max(1)
    .step(0.01)
    .name('Restitution')
    .onFinishChange(() => {
        defaultContactMaterial.restitution = debugObject.restitution
    })

gui.addColor(debugObject, 'sphereColor')
    .onChange(() => {
        sphereMaterial.color.set(debugObject.sphereColor)
    })

gui.addColor(debugObject, 'boxColor')
    .onChange(() => {
        boxMaterial.color.set(debugObject.boxColor)
    })