import './App.css'
import { useState } from 'react'
import { authenticate, registerCredentials } from './webauthn/webauthn'

function App() {
  const [username, setUsername] = useState('')

  return (
    <>
      <h1>WebAuthn test</h1>
      <div className="card">
        <input
          name="name"
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <button
          disabled={!username}
          onClick={() => registerCredentials(username)}
        >
          Register passKey
        </button>
        <button
          onClick={authenticate}
        >
          Authenticate
        </button>
      </div>
    </>
  )
}

export default App
