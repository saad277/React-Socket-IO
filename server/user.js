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
    const user = {
        id: id,
        name: name,
        room: room
    }

    users.push(user)

    return { user }

}

const removeUser = (id) => {

    const index = users.findIndex((user) => {

        user.id === id

    })

    if (index !== -1) {
        return users.slice(index, 1)
    }
}

const getUser = (id) => {

    return users.find((user) => {

        return user.id === id
    })

}

const getUsersInRoom = (room) => {

    return users.filter((user) => {

        return user.room === room
    })

}


module.exports = { addUser, removeUser, getUser, getUsersInRoom }