/// <reference types="@react-three/fiber" />

declare namespace JSX {
	interface IntrinsicElements {
		ambientLight: ReactThreeFiber.Object3DNode<
			THREE.AmbientLight,
			typeof THREE.AmbientLight
		>;
		directionalLight: ReactThreeFiber.Object3DNode<
			THREE.DirectionalLight,
			typeof THREE.DirectionalLight
		>;
		mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
		// Add other Three.js elements you use
	}
}
