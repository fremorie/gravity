import { createBoxMesh, createSphereMesh } from './meshes'
import { createBoxBody, createSphereBody } from './worldBodies'
import { defaultMaterial } from './worldMaterials'

export class ObjectGenerator {
    constructor({scene, world, store}) {
        this.scene = scene
        this.world = world
        this.store = store
    }

    resetStore() {
        this.store.splice(0, this.store.length)
    }

    createBox({dimensions, position}) {
        // Three.js mesh
        const mesh = createBoxMesh()
        mesh.scale.set(dimensions.width, dimensions.height, dimensions.depth)
        mesh.position.copy(position)
        this.scene.add(mesh)

        // Cannon.js body
        const body = createBoxBody(dimensions, defaultMaterial)
        body.position.copy(position)

        this.world.addBody(body)

        // Save in objects to update
        this.store.push({
           mesh,
           body,
       })
    }

    createSphere({radius, position}) {
        // Three.js mesh
        const mesh = createSphereMesh()
        mesh.scale.setScalar(radius)
        mesh.position.copy(position)
        this.scene.add(mesh)

        // Cannon.js body
        const body = createSphereBody(radius, defaultMaterial)
        body.position.copy(position)
        this.world.addBody(body)

        // Save in objects to update
        this.store.push({
            mesh,
            body,
        })
    }
}