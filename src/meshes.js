import { Mesh } from 'three'
import { boxGeometry, cylinderGeometry, planeGeometry, sphereGeometry } from './geometries'
import { sphereMaterial, boxMaterial, groundMaterial, cylinderMaterial } from './materials'
import { debugObject } from './debug'

export const createSphereMesh = () => {
    const sphere = new Mesh(
        sphereGeometry,
        sphereMaterial,
    )

    sphere.position.set(0, 1, 0)
    sphere.castShadow = true
    sphere.material.wireframe = debugObject.wireframe

    return sphere
}

export const createFloorMesh = () => {
    const floor = new Mesh(
        planeGeometry,
        groundMaterial,
    )
    floor.receiveShadow = true
    floor.rotation.x = - Math.PI * 0.5

    // HACK against z-fighting when wireframe = true
    floor.position.y = -0.001

    return floor
}

export const createBoxMesh = () => {
    const box = new Mesh(
        boxGeometry,
        boxMaterial,
    )
    box.castShadow = true
    box.material.wireframe = debugObject.wireframe

    return box
}

export const createCylinderMesh = () => {
    const cylinder = new Mesh(
        cylinderGeometry,
        cylinderMaterial,
    )
    cylinder.castShadow = true
    cylinder.material.wireframe = debugObject.wireframe

    return cylinder
}