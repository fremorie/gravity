import { SphereGeometry, PlaneGeometry, BoxGeometry, CylinderGeometry } from 'three'
import { PLANE_SIZE } from './config'

export const sphereGeometry = new SphereGeometry(1, 20, 20)
export const planeGeometry = new PlaneGeometry(PLANE_SIZE, PLANE_SIZE)
export const boxGeometry = new BoxGeometry(1, 1, 1, 1, 1, 1)
export const cylinderGeometry = new CylinderGeometry(1, 1, 2, 32, 1, false)