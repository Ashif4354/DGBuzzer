

function sendActiveStatus(socket, participantList) {
    let response = JSON.stringify({
        code: 1,
    })

    Object.keys(participantList).forEach((key) => {
        socket.send(response, undefined, undefined, 10001, participantList[key], (err) => {
            if (err) {
                console.log('ERROR in onMessageRecieveHandlerForHost', err)
            }
        })
    })
}

export { sendActiveStatus }