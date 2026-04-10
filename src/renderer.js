import { WebGLRenderer } from 'three'

export function createRenderer({
    canvas,
    sizes,
}) {
    const renderer = new WebGLRenderer({
        canvas: canvas
    })
    renderer.shadowMap.enabled = true
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    return renderer
}
