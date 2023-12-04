

function messageRecieveHandlerForHost(msg, rinfo, socket, roomName, roomId, roomNotFull, active, setParticipantList, setBuzzTimeline, setTimes, initialTime) {
    msg = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(msg)))
    active = active.current
    // console.log(roomId, msg) //

    const playerPort = 10001

    if (msg.code === 500 && msg.roomId == roomId) {
        setBuzzTimeline(prevState => {
            if (!prevState.includes(msg.playerName)) {
                setTimes(prevState => {
                    return [...prevState, Date.now() - initialTime]
                })
                return [...prevState, msg.playerName ]
            } else {
                return [...prevState ]
            }
        })

    } else if (msg.code === 100) {

        let response = JSON.stringify({
            code: 101,
            roomName: roomName,
        })

        socket.send(response, undefined, undefined, playerPort, rinfo.address, (err) => {
            if (err) {
                console.log('ERROR in onMessageRecieveHandlerForHost', err)
            }
        })
    } else if (msg.code === 200) {
        if (roomNotFull && !active) {
            let response = JSON.stringify({
                code: 201,
                roomName: roomName,
                roomId: roomId,
                playerName: msg.playerName,

            })

            socket.send(response, undefined, undefined, playerPort, rinfo.address, (err) => {
                if (err) {
                    console.log('ERROR in onMessageRecieveHandlerForHost', err)
                }
            })

            setParticipantList(prevState => ({
                ...prevState,
                [msg.playerName]: rinfo.address
            }))
        } else if (!roomNotFull) {
            let response = JSON.stringify({
                code: 202
            })

            socket.send(response, undefined, undefined, playerPort, rinfo.address, (err) => {
                if (err) {
                    console.log('ERROR in onMessageRecieveHandlerForHost', err)
                }
            })
        } else if (active) {
            let response = JSON.stringify({
                code: 203,
                roomName: roomName,
            })

            socket.send(response, undefined, undefined, playerPort, rinfo.address, (err) => {
                if (err) {
                    console.log('ERROR in onMessageRecieveHandlerForHost', err)
                }
            })
        }
    }
}

export { messageRecieveHandlerForHost }

