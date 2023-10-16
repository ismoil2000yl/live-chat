import './App.scss'
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './Chat'

const socket = io.connect("https://you-chat-backend.onrender.com")
// const socket = io.connect("http://localhost:8000")

function App() {

  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

  return (
    <div className='sign'>
      {!showChat ? (
        <div className="sign__box">
          <div className="sign__box__header">
            <h1>Live <span>Chat</span></h1>
          </div>
          <div className="sign__box__body">
            <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder='Your name' />
            <input onChange={(e) => setRoom(e.target.value)} type="text" placeholder='Chat name' />
            <button onClick={joinRoom}>Join</button>
          </div>
        </div>)
        : (
          <Chat socket={socket} userName={userName} room={room} />
        )
      }
    </div>
  )
}

export default App
