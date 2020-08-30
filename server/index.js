const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app)
const io = socketio(server)

const router = require("./router")

const { addUser, removeUser, getUser, getUsersInRoom } = require("./user")

app.use(router)


io.on("connection", (socket) => {

    console.log("new connection")


    socket.on("join", (data, callback) => {

        const { error, user } = addUser({ id: socket.id, name: data.name, room: data.room })

        if (error) {
            return callback(error);
        }

        socket.emit("message", { user: "admin", text: `${user.name} , Welcome to ROOM : ${user.room}` })
        //emitting a message to other users that that a specific has joined
        socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name} has joined !` })

        socket.join(user.room)

        callback();

    })

    socket.on("sendMessage", (message, callback) => {

        const user = getUser(socket.id)

        io.to(user.room).emit("message", { user: user.name, text: message })

        callback();

    })

    socket.on("disconnect", () => {

        console.log("User has left")
    })
})

server.listen(PORT, () => {

    console.log("Server Running at PORT ", PORT)
})