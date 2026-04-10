import { MeshStandardMaterial } from 'three';

export const standardMaterial = new MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
})

export const groundMaterial = new MeshStandardMaterial({
    color: '#777777',
    metalness: 0.3,
    roughness: 0.4,
})