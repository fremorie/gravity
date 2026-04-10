import * as CANNON from 'cannon-es'
import { debugObject } from './debug'

export const defaultMaterial = new CANNON.Material('default')

export const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: debugObject.friction,
        restitution: debugObject.restitution,
    }
)