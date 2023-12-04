

function MessageRecieveHandlerForJoin(msg, rinfo, setRooms, setErrorMessage, navigation) {
    msg = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(msg)))

    if (msg.code === 101) {
        const roomName = msg.roomName

        setRooms(prevState => ({
            ...prevState,
            [roomName]: rinfo.address
        }))
    }

    if (msg.code === 201) {
        navigation.pop()
        navigation.navigate('PlayerRoom', {
            roomName: msg.roomName,
            playerName: msg.playerName,
            roomId: msg.roomId,
            serverIP: rinfo.address
        })
    } else if (msg.code === 202) {
        setErrorMessage('Room is full')
    } else if (msg.code === 203) {
        setErrorMessage('Room already started')
    }
}

function messageRecieveHandlerForPlayerRoom(msg, rinfo, socket, setStatus, setMyPosition, setFirstPosition, playerName) {

    msg = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(msg)))
    console.log(msg.buzzTimeline)

    if (msg.code === 1) {
        setStatus(1)
        setMyPosition(0)
        setFirstPosition('Nil')
    } else if (msg.code === 501) {
        setMyPosition(msg.buzzTimeline.indexOf(playerName) + 1)
        setFirstPosition(msg.buzzTimeline[0])
    }

}

export { MessageRecieveHandlerForJoin, messageRecieveHandlerForPlayerRoom }