import React, { useEffect, useState } from 'react'

const Chat = ({ socket, userName, room }) => {

    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])

    return (
        <div className='chat'>
            <div className="chat__title">
                <h3>Chat: <span>{room}</span></h3>
            </div>
            <div className="chat__box">
                {
                    messageList.map((item) => {
                        return (
                            <div className={userName === item.author ? "my-message" : "user-message"}>
                                <div className={`message__title ${userName === item.author ? 'my-title' : 'user-title'}`}>
                                    <h4>{item.author}</h4>
                                    <h5>{item.time}</h5>
                                </div>
                                <div className="message__info">
                                    <p>{item.message}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="chat__footer">
                <textarea type="text"
                    value={currentMessage}
                    placeholder="Writing...!"
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )

}

export default Chat