import { PerspectiveCamera } from 'three'

export function createCamera({
    aspectRatio,
}) {
    const camera = new PerspectiveCamera(75, aspectRatio, 0.1, 200)
    camera.position.set(- 3, 3, 3)

    return camera
}
