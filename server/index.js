const express=require("express")
const socketio=require("socket.io")
const http=require("http")
const PORT=process.env.PORT||5000;
const app=express();
const server=http.createServer(app)
const io=socketio(server)

const router=require("./router")

app.use(router)


io.on("connection",(socket)=>{

    console.log("new connection")

    socket.on("disconnect",()=>{

            console.log("User has left")
    })
})

server.listen(PORT,()=>{

    console.log("Server Running at PORT ",PORT)
})