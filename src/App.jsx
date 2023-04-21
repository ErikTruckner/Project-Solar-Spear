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
        position: [11.02, 7.32, 19.1],
      }}>
      <color attach='background' args={['black']} />
      <MainContainer />
      <OrbitControls />
    </Canvas>
  )
}

export default App
