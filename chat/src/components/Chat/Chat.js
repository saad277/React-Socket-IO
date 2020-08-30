import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'


import "./chat.css"

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/messages'

let socket;

const Chat = ({ location }) => {              //location comes from react-router

    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const ENDPOINT = "localhost:5000"

    useEffect(() => {

        const { name, room } = queryString.parse(location.search)

        console.log(name, room)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit("join", { name: name, room: room }, () => {         //last one is callback


        })

        return () => {
            socket.emit("disconnect")
            socket.off()
        }



    }, [ENDPOINT, location.search])


    useEffect(() => {

        socket.on("message", (message) => {

            setMessages([...messages, message])

        })

    }, [messages])


    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {

            socket.emit("sendMessage", message, () => {

                setMessage("")
            })
        }

    }

    console.log(message)
    console.log(messages)

    return (
        <div className="outerContainer">

            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
             
            </div>

        </div>
    )
}

export default Chat;