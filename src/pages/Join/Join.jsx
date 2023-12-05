import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, RefreshControl } from 'react-native';
import dgram from 'react-native-udp'

import { MessageRecieveHandlerForJoin } from './Scripts/MessageRecievers';


const Join = ({ navigation }) => {
    const [playerName, setPlayerName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [UDPSocket, setUDPSocket] = useState(null)
    const [rooms, setRooms] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    const onJoinRoomHandler = (roomName) => {
        if (playerName == '') {
            setErrorMessage('Please enter your name');
            return
        }
        UDPSocket.send(JSON.stringify({ code: 200, playerName: playerName }), undefined, undefined, 10000, rooms[roomName], (e) => console.log(e)) // send join request to host

    }

    const broadcastPresence = (socket) => {
        try {
            UDPSocket.send(JSON.stringify({ code: 100 }), undefined, undefined, 10000, '255.255.255.255', (e) => console.log(e))
        } catch (e) {
            socket.send(JSON.stringify({ code: 100 }), undefined, undefined, 10000, '255.255.255.255', (e) => console.log(e))
        }
    }

    const onRefresh = () => {
        setRooms({})
        setRefreshing(true)
        broadcastPresence(UDPSocket)

        setTimeout(() => {
            setRefreshing(false)
        }, 1000)

    }

    useEffect(() => {

        const socket = dgram.createSocket({ type: 'udp4', debug: true })
        socket.bind(10001, () => {
            socket.setBroadcast(true)
            setUDPSocket(socket)

            socket.on('message', (msg, rinfo) => {
                MessageRecieveHandlerForJoin(msg, rinfo, setRooms, setErrorMessage, navigation)
            })

            broadcastPresence(socket)
        })

    }, [])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.upperContainer}>
                <Text style={styles.titleText}>DG BUZZER</Text>
            </View>
            <View style={styles.lowerContainer}>
                <View style={styles.userPanel}>
                    <TextInput
                        style={[styles.input, styles.boxshadow, { color: 'black' }]}
                        placeholder="Your Name"
                        placeholderTextColor="grey"
                        onChangeText={(text) => setPlayerName(text)}
                        value={playerName}
                    />
                    <View style={[styles.roomsInProgressContainer, styles.boxshadow]}>
                        <Text style={styles.roomsInProgressText}>Rooms in Progress</Text>
                        <View style={styles.roomInProgressScrollViewContainer}>
                            <ScrollView style={styles.roomsInProgressScrollView}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            >
                                {
                                    Object.keys(rooms).map((room, index) => {
                                        return (
                                            <View key={index} style={styles.roomInProgress}>
                                                <View style={styles.roomInProgressNameContainer}>
                                                    <Text style={styles.roomInProgressName}>{room}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.JoinBtn}
                                                    onPress={() => onJoinRoomHandler(room)}
                                                >
                                                    <Text style={styles.joinBtnText}>Join</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                        <Text style={[styles.bottomText, { color: errorMessage == '' ? 'black' : 'red' }]}>
                            {
                                errorMessage == '' ? 'Click join button of respective room' : errorMessage
                            }
                        </Text>
                    </View>


                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E2F71',
    },
    upperContainer: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 35,
        fontFamily: 'Iceland-Regular'
    },
    lowerContainer: {
        width: '100%',
        height: '80%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 85
    },
    userPanel: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: '20%',
        // justifyContent: 'center',
        borderRadius: 10,
        // backgroundColor: 'red'
    },
    input: {
        width: '80%',
        height: 60,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 35,
        fontSize: 20,
        fontFamily: 'Iceland-Regular'
    },
    roomsInProgressContainer: {
        width: '80%',
        height: '70%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'green'
    },
    roomsInProgressText: {
        fontSize: 20,
        margin: 15,
        fontFamily: 'Iceland-Regular',
        color: 'black',
        // backgroundColor: 'red'
    },
    roomInProgressScrollViewContainer: {
        width: '80%',
        height: '70%',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
        // backgroundColor: 'red'
    },
    roomsInProgressScrollView: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'white',
        borderRadius: 10,
        // backgroundColor: 'blue'
    },
    roomInProgress: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        // backgroundColor: 'yellow'
    },
    roomInProgressNameContainer: {
        width: '70%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green'
    },
    roomInProgressName: {
        fontSize: 20,
        fontFamily: 'Iceland-Regular',
        color: 'black'
    },
    JoinBtn: {
        width: '30%',
        height: '100%',
        backgroundColor: '#1CC800',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    joinBtnText: {
        fontSize: 20,
        fontFamily: 'Iceland-Regular',
        color: 'white'
    },
    bottomText: {
        fontSize: 15,
        fontFamily: 'Iceland-Regular',
        color: 'black',
        marginTop: '7%',
        // backgroundColor: 'red'
    },
    boxshadow: {
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        elevation: 10,

    }
});

export default Join;