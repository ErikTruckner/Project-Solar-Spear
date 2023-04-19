import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MainContainer from './MainContainer'

function App() {
  return (
    <Canvas
      shadows
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 3, 3] }}>
      <color attach='background' args={['black']} />
      <MainContainer />
      <OrbitControls />
    </Canvas>
  )
}

export default App
