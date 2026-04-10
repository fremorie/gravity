import { MeshStandardMaterial, Color } from 'three';
import { debugObject } from './debug'

export const sphereMaterial = new MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    color: new Color(debugObject.sphereColor),
})

export const boxMaterial = new MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    color: new Color(debugObject.boxColor),
})

export const cylinderMaterial = new MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    color: new Color(debugObject.cylinderColor),
})

export const groundMaterial = new MeshStandardMaterial({
    color: 0x576A8F,
    metalness: 0.9,
    roughness: 0.4,
})