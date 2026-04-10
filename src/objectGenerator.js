import { createBoxMesh, createCylinderMesh, createSphereMesh } from './meshes'
import { createBoxBody, createCylinderBody, createSphereBody } from './worldBodies'
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

    reset() {
        for (const object of this.store) {
            // Clear world
            this.world.removeBody(object.body)

            // Clear scene
            this.scene.remove(object.mesh)
        }

        this.resetStore()
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

    createCylinder({radius, position}) {
        // Three.js mesh
        const mesh = createCylinderMesh()
        mesh.scale.setScalar(radius)
        mesh.position.copy(position)
        this.scene.add(mesh)

        // Cannon.js body
        const body = createCylinderBody(radius, defaultMaterial)
        body.position.copy(position)
        this.world.addBody(body)

        // Save in objects to update
        this.store.push({
            mesh,
            body,
        })

    }
}