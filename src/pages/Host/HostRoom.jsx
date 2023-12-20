import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler } from 'react-native'
import dgram from 'react-native-udp'

import RoomBackground from '../../Components/RoomBackground'
import StatusIndicator from '../../Components/StatusIndicator'
import { backButtonAlert } from '../../Scripts/Alerts'
import { messageRecieveHandlerForHost } from './Scripts/MessageRecievers'
import { sendActiveStatus } from './Scripts/SendActiveStatus'

const HostRoom = ({ navigation, route }) => {
    const [participantList, setParticipantList] = useState({})
    const [BuzzTimeline, setBuzzTimeline] = useState([])
    const [UDPSocket, setUDPSocket] = useState(null)
    const [active, setActive] = useState(false)
    const [times, setTimes] = useState([])
    const participantCount = useRef(0)
    const activeRef = useRef(active)
    const initialTime = useRef(0)
    const roomID = useRef(0)   

    const onStartHandler = () => {
        setActive(prev => !prev)
        sendActiveStatus(UDPSocket, participantList)
        initialTime.current = Date.now()
    }

    const onResetHandler = () => {
        setBuzzTimeline([])
        sendActiveStatus(UDPSocket, participantList)
        initialTime.current = Date.now()
        setTimes([])
    }

    const onExitHandler = () => {
        // UDPSocket.close()
        activeRef.current = -1  // -1 means exit and room has been closed
        navigation.popToTop()
    }

    const getConvertedTime = (time) => {
        let milliseconds = time % 1000
        time = Math.floor(time / 1000)
        let seconds = time % 60
        time = Math.floor(time / 60)
        let minutes = time % 60

        time = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + '.' + milliseconds.toString().padStart(3, '0')

        return time
    }

    useEffect(() => {
        // setRoomID(Math.floor(Math.random() * 1000))
        roomID.current = Math.floor(Math.random() * 1000)

        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault()
            backButtonAlert(navigation, 'host', e)
        })

        const socket = dgram.createSocket('udp4')
        socket.bind(10000, () => {
            setUDPSocket(socket)

            socket.on('message', (msg, rinfo) => {
                messageRecieveHandlerForHost(msg, rinfo, socket, route.params.roomName, roomID.current, participantCount.current < route.params.roomSize, activeRef, setParticipantList, setBuzzTimeline, setTimes, initialTime.current)
            })
        })


    }, [])

    useEffect(() => {
        activeRef.current = active
    }, [active])

    useEffect(() => {
        participantCount.current = Object.keys(participantList).length
    }, [participantList])

    useEffect(() => {
        if (UDPSocket) {
            Object.keys(participantList).forEach((name) => {
                UDPSocket.send(JSON.stringify({ code: 501, buzzTimeline: BuzzTimeline }), undefined, undefined, 10001, participantList[name])
            })
        }
    }, [BuzzTimeline])

    return (
        <View style={styles.mainContainer}>
            <RoomBackground />
            <View style={styles.middleBox}>
                <View style={styles.middleBoxInfoContainer}>
                    <Text style={styles.middleBoxInfoText}>Room Name: {route.params.roomName}</Text>
                    {
                        !active ? (
                            <Text style={styles.middleBoxInfoText}>Room Size: {route.params.roomSize}</Text>
                        ) : (
                            <></>
                        )
                    }

                    <View style={styles.statusContainer}>
                        <Text style={styles.statusText}>Status:  </Text>
                        {
                            active ? (
                                <StatusIndicator text='Active' color='#1CC800' />
                            ) : (
                                <StatusIndicator text='Waiting For players' color='#FF0000' />
                            )
                        }

                    </View>
                </View>

                <View style={styles.participantListContainer}>
                    <View style={styles.participantListHeadingContainer}>
                        {
                            active ? (
                                <Text style={styles.buzzTimelineHeading}>Buzz Timeline</Text>
                            ) : (
                                <Text style={styles.participantJoined}>Participants Joined: {Object.keys(participantList).length}</Text>
                            )
                        }

                    </View>
                    {
                        active ? (
                            <View style={styles.buzzTimeline}>
                                <ScrollView style={styles.buzzTimelineScroll}>
                                    {BuzzTimeline.length ? (
                                        BuzzTimeline.map((name, index) => {

                                            return (
                                                <View key={index} style={styles.eachName}>
                                                    <View style={[styles.positionContainer, { backgroundColor: index === 0 ? '#1CC800' : '#FF0000' }]}>
                                                        <Text style={styles.positionText}>{index + 1}</Text>
                                                    </View>
                                                    <View style={styles.nameContainer}>
                                                        <Text style={styles.nameText}>{name}</Text>
                                                    </View>
                                                    <View style={styles.timeContainer}>
                                                        <Text style={styles.timeText}>{getConvertedTime(times[index])}</Text>
                                                    </View>
                                                </View>
                                            )
                                        })) : (
                                        <View style={styles.buzzWaiting}>
                                            <Text style={styles.buzzWaitingText}>Waiting For buzzes...</Text>
                                        </View>
                                    )
                                    }
                                </ScrollView>
                            </View>
                        ) : (
                            <View style={styles.participantList}>
                                <ScrollView style={styles.participantListScroll}>
                                    {
                                        Object.keys(participantList).map((name, index) => {
                                            return (
                                                <View key={index} style={styles.eachName}>
                                                    <Text style={styles.nameText}>{name}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                        )
                    }

                </View>
                <View style={styles.btnContainer}>
                    {
                        active ? (
                            <TouchableOpacity
                                style={[styles.btn, styles.startBtn]}
                                onPress={onResetHandler}
                            >
                                <Text style={styles.btnText}>Reset</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={[styles.btn, styles.startBtn]}
                                onPress={() => onStartHandler()}>

                                <Text style={styles.btnText}>Start</Text>
                            </TouchableOpacity>
                        )
                    }


                    <TouchableOpacity
                        style={[styles.btn, styles.ExitBtn]}
                        onPress={onExitHandler}>

                        <Text style={styles.btnText}>Exit</Text>
                    </TouchableOpacity>

                </View>
            </View>


        </View>
    )

}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
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
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    middleBoxInfoText: {
        fontSize: 27,
        fontFamily: 'Iceland-Regular',
        color: 'black',
        marginBottom: 3,
    },
    statusContainer: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor: 'yellow',
    },
    statusText: {
        fontSize: 27,
        fontFamily: 'Iceland-Regular',
        color: 'black',
        // marginBottom: 10,
    },
    participantListContainer: {
        width: '80%',
        height: '49%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CFCFCF',
        borderRadius: 20

    },
    participantListHeadingContainer: {
        width: '100%',
        height: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
    },
    participantJoined: {
        fontSize: 22,
        fontFamily: 'Iceland-Regular',
        color: 'black',
        marginBottom: 3,
    },
    participantList: {
        width: '100%',
        height: '88%',
        backgroundColor: 'white',
        borderRadius: 20
    },
    participantListScroll: {
        margin: 20,
        // backgroundColor: 'blue'
    },
    buzzTimelineHeadingContainer: {
        width: '100%',
        height: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
    },
    buzzTimelineHeading: {
        fontSize: 22,
        fontFamily: 'Iceland-Regular',
        color: 'black',
        marginBottom: 3,
        // backgroundColor: 'yellow',
    },
    buzzTimeline: {
        width: '100%',
        height: '88%',
        backgroundColor: 'white',
        // backgroundColor: 'yellow',
        borderRadius: 20
    },
    buzzTimelineScroll: {
        margin: 20,
        // backgroundColor: 'blue'
    },
    eachName: {
        width: '100%',
        height: 30,
        backgroundColor: '#CFCFCF',
        borderRadius: 10,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    positionContainer: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    positionText: {
        fontSize: 20,
        fontFamily: 'Iceland-Regular',
        color: 'white',
    },
    nameContainer: {
        width: '55%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    nameText: {
        fontSize: 20,
        fontFamily: 'Iceland-Regular',
        color: 'black',
        // marginLeft: '40%',
    },
    timeContainer: {
        width: '25%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'yellow'

    },
    timeText: {
        fontSize: 12,
        fontFamily: 'Iceland-Regular',
        color: 'black',
        // marginLeft: '15%'
    },
    buzzWaiting: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'yellow',
    },
    buzzWaitingText: {
        fontSize: 20,
        fontFamily: 'Iceland-Regular',
        color: 'black',
    },
    btnContainer: {
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'yellow',
    },
    btn: {
        backgroundColor: '#0E2F71',
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    startBtn: {
        width: '80%',
        height: '30%',
    },
    ExitBtn: {
        width: '60%',
        height: '25%',
    },
    btnText: {
        fontSize: 27,
        fontFamily: 'Iceland-Regular',
        color: 'white',
    },




})

export default HostRoom
