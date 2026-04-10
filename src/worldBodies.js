import * as CANNON from 'cannon-es'

export const createFloorBody = () => {
    const floorShape = new CANNON.Plane()
    const floorBody = new CANNON.Body({
        mass: 0,
    })
    floorBody.quaternion.setFromAxisAngle(
        new CANNON.Vec3(-1, 0, 0),
        Math.PI * 0.5,
    )
    floorBody.addShape(floorShape)

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