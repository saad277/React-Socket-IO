const users = [];



const addUser = ({ id, name, room }) => {
    // javaScript Mastery ----> javaScriptMastery  // we need this conversion

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();


    const existingUsers = users.find((user) => {

        user.room == room && user.name === name
    })

    if (existingUsers) {
        return { error: "Username is taken " }
    }
    const user ={
        id:id,
        name:name,
        room:room
    }

    users.push(user)

    return {user}

}

const removeUser = () => {

}

const getUser = () => {


}

const getUsersInRoom = () => {


}