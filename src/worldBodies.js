import * as CANNON from 'cannon-es'
import { PLANE_SIZE } from './config.js'

export const createFloorBody = () => {
    const shape = new CANNON.Box(
        new CANNON.Vec3(
            PLANE_SIZE / 2,
            PLANE_SIZE / 2,
            PLANE_SIZE / 2,
        )
    )
    const floorBody = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(0, -PLANE_SIZE / 2, 0),
        shape,
    })

    return floorBody
}

export const createSphereBody = (radius, material) => {
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
        material,
    })

    return body
}

export const createBoxBody = (dimensions, material) => {
    const shape = new CANNON.Box(
        new CANNON.Vec3(
            dimensions.width / 2,
            dimensions.height / 2,
            dimensions.depth / 2,
        )
    )
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
        material,
    })

    return body
}