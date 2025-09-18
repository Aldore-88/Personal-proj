import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({title}) => {
  const [hasLiked, setHasLiked] = useState(false); //destructure an array []

  return (
    <div className="card">
      <h2>{title}</h2>
      <button onClick={() => setHasLiked(true)}>
        {hasLiked ? 'Linked':'Like'}
      </button>
    </div>
  )
}

const App = () => {

  return (
    <div className="card-container">
      <h2>Functional Arrow Component</h2>
      
      <Card title="Star Wars" rating={5} isCool={true} actors={[{name: 'Actors'}]} />
      <Card title="Avatar" />
      <Card title="The Lion King" />
    </div>
  )
}

export default App
