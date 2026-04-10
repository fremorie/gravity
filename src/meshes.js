import { Mesh } from 'three'
import { boxGeometry, planeGeometry, sphereGeometry } from './geometries'
import { standardMaterial } from './materials'

export const createSphereMesh = () => {
    const sphere = new Mesh(
        sphereGeometry,
        standardMaterial,
    )

    sphere.position.set(0, 1, 0)
    sphere.castShadow = true

    return sphere
}

export const createFloorMesh = () => {
    const floor = new Mesh(
        planeGeometry,
        standardMaterial,
    )
    floor.receiveShadow = true
    floor.rotation.x = - Math.PI * 0.5

    return floor
}

export const createBoxMesh = () => {
    const box = new Mesh(
        boxGeometry,
        standardMaterial,
    )
    box.castShadow = true

    return box
}