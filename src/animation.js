import { Timer } from 'three'

const clock = new Timer()

export const animateScene = ({
    controls,
    renderer,
    scene,
    camera,
}) => {
    const elapsedTime = clock.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(() => animateScene({
        controls,
        renderer,
        scene,
        camera,
    }))
}