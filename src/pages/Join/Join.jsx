import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import dgram from 'react-native-udp'
import { NetworkInfo } from 'react-native-network-info';

const Join = ({ navigation }) => {
    const [playerName, setPlayerName] = useState('Chamber');
    // const [rooms, setRooms] = useState({'north': '192.168.5.5', 'south': '192.168.8.8', 'east': '192.168.9.9', 'west': '192.168.0.0'});
    const [errorMessage, setErrorMessage] = useState('');
    const [UDPSocket, setUDPSocket] = useState(null)
    const [rooms, setRooms] = useState({ 'north': '192.168.5.5' });

    const onJoinRoomHandler = () => {
        // if (playerName == '') {
        //     setErrorMessage('Please enter your name');
        //     return
        // }
        console.log('before send')
        UDPSocket.send(JSON.stringify({ code: 100 }), 0, JSON.stringify({ code: 100 }).length, 10000, '255.255.255.255', (e) => console.log(e)) // broadcast player presence
        console.log('after send')
        // navigation.pop();
        // navigation.navigate('PlayerRoom', { roomName: 'BUZZWIN', playerName: playerName });
    }

    useEffect(() => {

        NetworkInfo.getIPV4Address().then(ipv4Address => {
            console.log('ipv4 p' + ipv4Address);
        });

        const socket = dgram.createSocket({ type: 'udp4', debug: true })
        // udpSockett.current = socket
        socket.bind(10001, () => {
            console.log('player socket created')
            socket.setBroadcast(true)
            setUDPSocket(socket)

        })
        setTimeout(() => {
            socket.send(JSON.stringify({ code: 100 }), 0, JSON.stringify({ code: 100 }).length, 10000, '255.255.255.255', (e) => console.log(e)) // broadcast player presence
        }, 5000)


        socket.on('message', (msg, rinfo) => {
            console.log(msg);
            console.log(rinfo)
            onMessageRecieveHandlerForJoin(msg, rinfo, setRooms, setErrorMessage, (err) => { console.log(err) })
        })



        return () => socket.close()
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
                            <ScrollView style={styles.roomsInProgressScrollView}>
                                {
                                    Object.keys(rooms).map((room, index) => {
                                        return (
                                            <View key={index} style={styles.roomInProgress}>
                                                <View style={styles.roomInProgressNameContainer}>
                                                    <Text style={styles.roomInProgressName}>{room}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.JoinBtn}
                                                    onPress={onJoinRoomHandler}
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
        backgroundColor: 'white',
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