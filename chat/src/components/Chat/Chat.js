import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'


import "./chat.css"

import InfoBar from '../InfoBar/InfoBar'

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

        if(message){

            socket.emit("sendMessage",message,()=>{

                setMessage("")
            })
        }

    }

    console.log(message)
    console.log(messages)

    return (
        <div className="outerContainer">
             <InfoBar room={room} />
            <div className="container">
                <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={(event) => event.key === "Enter" ? sendMessage(event) : null}
                />
            </div>

        </div>
    )
}

export default Chat;