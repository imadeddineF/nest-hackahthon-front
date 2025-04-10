import { ReactThreeFiber } from "@react-three/fiber";
import { OrbitControls } from "three-stdlib";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			ambientLight: ReactThreeFiber.LightProps;
			directionalLight: ReactThreeFiber.LightProps;
			mesh: ReactThreeFiber.MeshProps;
			boxGeometry: ReactThreeFiber.BufferGeometryProps;
			planeGeometry: ReactThreeFiber.BufferGeometryProps;
			sphereGeometry: ReactThreeFiber.BufferGeometryProps;
			cylinderGeometry: ReactThreeFiber.BufferGeometryProps;
			ringGeometry: ReactThreeFiber.BufferGeometryProps;
			meshStandardMaterial: ReactThreeFiber.MeshStandardMaterialProps;
			meshBasicMaterial: ReactThreeFiber.MeshBasicMaterialProps;
			orbitControls: ReactThreeFiber.OrbitControlsProps;
			group: ReactThreeFiber.GroupProps;
		}
	}
}
