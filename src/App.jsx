import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MainContainer from './MainContainer'

function App() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 35,
        near: 0.01,
        far: 1000,
        position: [16.26, 20.32, 26.11],
      }}>
      <color attach='background' args={['black']} />
      <MainContainer />
      <OrbitControls />
    </Canvas>
  )
}

export default App
