import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import dgram from 'react-native-udp'

import RoomBackground from '../../Components/RoomBackground';
import StatusIndicator from '../../Components/StatusIndicator';
import { backButtonAlert } from '../../Scripts/Alerts';
import { messageRecieveHandlerForPlayerRoom } from './Scripts/MessageRecievers';
import { playBuzzer } from '../../Scripts/PlaySounds';

function PlayerRoom({ navigation, route }) {
    const [status, setStatus] = useState(0);
    const [myPosition, setMyPosition] = useState(0);
    const [firstPosition, setFirstPosition] = useState('N/A');
    const [UDPSocket, setUDPSocket] = useState(null)
    

    const onExitHandler = () => {
        navigation.popToTop()
    }

    const onBuzz = () => {
        if (status != 1) {
            return
        }
        const buzzMsg = JSON.stringify({
            code: 500,
            roomId: route.params.roomId,
            playerName: route.params.playerName,
        })

        UDPSocket.send(buzzMsg, undefined, undefined, 10000, route.params.serverIP, (err) => {console.log(err)})
        setStatus(-1)
        playBuzzer()
    }

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault()
            backButtonAlert(navigation,'player', e)
        })

        const socket = dgram.createSocket({ type: 'udp4', debug: true })
        socket.bind(10001, () => {
            setUDPSocket(socket)
            socket.on('message', (msg, rinfo) => {
                messageRecieveHandlerForPlayerRoom(msg, rinfo, socket, setStatus, setMyPosition, setFirstPosition, route.params.playerName)
            })
        })        

    }, [])

    return (
        <View style={styles.mainContainer}>
            <RoomBackground />
            <View style={styles.middleBox}>
                <View style={styles.middleBoxInfoContainer}>
                    <Text style={styles.middleBoxInfoText}>Room Name: {route.params.roomName}</Text>
                    <Text style={styles.middleBoxInfoText}>My Name: {route.params.playerName}</Text>


                    <View style={styles.statusContainer}>
                        <Text style={styles.statusText}>Status:  </Text>
                        {
                            status == 0 ? (
                                <StatusIndicator text='Waiting For players' color='#FF0000' />

                            ) : status == 1 ? (
                                <StatusIndicator text='Active' color='#1CC800' />
                            ) : (
                                <StatusIndicator text='Waiting for next round' color='#D7DB05' />
                            )


                        }

                    </View>
                </View>
                <View style={styles.buzzerContainer}>
                    <TouchableOpacity
                        style={styles.buzzerBtn}
                        onPress={onBuzz}
                    >
                        <Text style={styles.buzzerBtnText}>BUZZ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ackContainer}>
                    <Text style={styles.ackText}>My Position : {myPosition == 0 ? 'N/A' : myPosition}</Text>
                    <Text style={styles.ackText}>First Position : {firstPosition}</Text>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.exitBtn}
                        onPress={onExitHandler}
                    >
                        <Text style={styles.exitBtnText}>Exit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#0E2F71',
        alignItems: 'center',
        justifyContent: 'center',

    },
    middleBox: {
        width: '90%',
        height: '80%',
        position: 'absolute',
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        alignItems: 'center',
        top: 100,
    },
    middleBoxInfoContainer: {
        width: '100%',
        height: '25%',
        // backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        // top: 50,
    },
    middleBoxInfoText: {
        fontSize: 27,
        fontFamily: 'Iceland-Regular',
        // marginBottom: 50,
        color: 'black',
    },
    statusContainer: {
        width: '90%',
        height: '25%',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    statusText: {
        fontSize: 27,
        fontFamily: 'Iceland-Regular',
        marginRight: 10,
        color: 'black',
    },
    buzzerContainer: {
        width: '80%',
        height: '44%',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        // top: 50,
    },
    buzzerBtn: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FF0000',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buzzerBtnText: {
        fontSize: 27,
        fontFamily: 'Iceland-Regular',
        color: 'white',
    },
    ackContainer: {
        width: '80%',
        height: '15%',
        // backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center',
        // top: 50,
    },
    ackText: {
        fontSize: 23,
        fontFamily: 'Iceland-Regular',
        color: 'black',
    },
    btnContainer: {
        width: '80%',
        height: '10%',
        // backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        // top: 50,
    },
    exitBtn: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0E2F71',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: ,
    },
    exitBtnText: {
        fontSize: 27,
        fontFamily: 'Iceland-Regular',
        color: 'white',
    },
    


});

export default PlayerRoom;
