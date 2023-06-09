import { Canvas } from '@react-three/fiber'

import MainContainer from './MainContainer'

function App() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 55,
        near: 1,
        far: 1000,
        position: [16.14, 8.32, 19.81],
      }}>
      <color attach='background' args={['black']} />
      <MainContainer />
    </Canvas>
  )
}

export default App
