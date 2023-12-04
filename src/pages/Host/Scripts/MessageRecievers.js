

function onMessageRecieveHandlerForHost(msg, rinfo, socket, roomName, roomSize, active, participants) {
    msg = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(msg)))
    // msg = JSON.parse(msg.toString())   
    console.log('response' + msg)

    if (msg.code === 100) {

        let response = JSON.stringify({
            code: 101,
            roomName: roomName,
        })

        socket.send(response, undefined, undefined, 10001, rinfo.address, (err) => {
            if (err) {
                console.log('ERROR in onMessageRecieveHandlerForHost' + err)
            }
        })
    }
}

export default onMessageRecieveHandlerForHost

