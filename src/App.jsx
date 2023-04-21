import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MainContainer from './MainContainer'

function App() {
  return (
    <Canvas
      shadows
      camera={{ fov: 75, near: 0.1, far: 1000, position: [3.02, 3.32, 4.1] }}>
      <color attach='background' args={['black']} />
      <MainContainer />
      <OrbitControls />
    </Canvas>
  )
}

export default App
