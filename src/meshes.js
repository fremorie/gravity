import * as THREE from 'three'
import { planeGeometry, sphereGeometry } from './geometries'
import { standardMaterial } from './materials'

export const createSphereMesh = () => {
    const sphere = new THREE.Mesh(
        sphereGeometry,
        standardMaterial,
    )

    sphere.position.set(0, 1, 0)
    sphere.castShadow = true

    return sphere
}

export const createFloorMesh = () => {
    const floor = new THREE.Mesh(
        planeGeometry,
        standardMaterial,
    )
    floor.receiveShadow = true
    floor.rotation.x = - Math.PI * 0.5

    return floor
}