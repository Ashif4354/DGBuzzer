

function onMessageRecieveHandlerForJoin(msg, rinfo, setRooms, setErrorMessage){
    // let msg = String.fromCharCode.apply(null, new Uint8Array(msg))
    const msg = JSON.parse(msg.toString())

    if(msg.code === 101){
        const roomName = msg.roomName

        setRooms(prevState => {
            prevState.roomName = rinfo.address
            return prevState
        })
    }
}