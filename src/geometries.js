import { SphereGeometry, PlaneGeometry, BoxGeometry } from 'three'
import { PLANE_SIZE } from './config'

export const sphereGeometry = new SphereGeometry(1, 20, 20)
export const planeGeometry = new PlaneGeometry(PLANE_SIZE, PLANE_SIZE)
export const boxGeometry = new BoxGeometry(1, 1, 1, 1, 1, 1)