import * as CANNON from 'cannon-es'
import { defaultContactMaterial } from './worldMaterials'

// World settings
const world = new CANNON.World()

world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true
world.gravity.set(0, -9.82, 0)

// Materials
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial

export {
    world
}
