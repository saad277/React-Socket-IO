import React from 'react'

import ScrollToBottom from 'react-scroll-to-bottom'


import './messages.css'

import Message from '../Message/message'

const Messages = ({ messages, name }) => {


    return (
        <ScrollToBottom>
            {messages.map((x, i) => {
                return (
                    <div key={i}>
                        <Message message={x} name={name} />
                    </div>
                )
            })}
        </ScrollToBottom>
    )
}

export default Messages;