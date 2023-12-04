import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const Host = ({ navigation }) => {
    const [roomName, setRoomName] = useState('');
    const [roomSize, setRoomSize] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const onPlusClick = () => {
        if (roomSize < 1000) {
            setRoomSize(roomSize + 1);
        }
    }

    const onMinusClick = () => {
        if (roomSize) {
            setRoomSize(roomSize - 1);
        }
    }

    const onChangeTexthandler = (text) => {
        let num = parseInt(text)

        if (num) {
            if (num > 1000) {
                setRoomSize(1000)
            } else {
                setRoomSize(num)
            }
        } else {
            setRoomSize(0)
        }
    }

    const onStartHandler = () => {
        navigation.pop()
        navigation.navigate('HostRoom', { roomName: 'BUZZWIN', roomSize: 15 })
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.upperContainer}>
                <Text style={styles.titleText}>DG BUZZER</Text>
            </View>

            <View style={styles.lowerContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingText}>Host</Text>
                    </View>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        style={[styles.input, styles.boxshadow, { color: 'black' }]}
                        placeholder="Room Name"
                        placeholderTextColor="grey"
                        onChangeText={(text) => setRoomName(text)}
                        value={roomName}
                    />

                    <View style={styles.roomSizeInputContainer}>
                        <Text style={styles.roomSizeText}>Room Size</Text>
                        <View style={[styles.roomSizeInput, styles.boxshadow]}>

                            <TouchableOpacity
                                style={styles.plusMinusBtn}
                                onPress={onMinusClick}
                            >
                                <Text style={styles.minus}>-</Text>
                            </TouchableOpacity>

                            {/* <Text style={styles.roomSize}>{roomSize}</Text> */}
                            <TextInput
                                style={[styles.roomSize, { color: 'black' }]}
                                // placeholder="0"
                                // placeholderTextColor="grey"
                                inputMode='numeric'
                                onChangeText={onChangeTexthandler}
                                value={roomSize.toString()}
                            />

                            <TouchableOpacity
                                style={styles.plusMinusBtn}
                                onPress={onPlusClick}
                            >
                                <Text style={styles.plus}>+</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <TouchableOpacity
                        onPress={onStartHandler}
                        style={[styles.btn, styles.hostBtn]}>
                        <Text style={[styles.btntext, { color: 'white' }]}>Start</Text>
                    </TouchableOpacity>
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
        borderTopLeftRadius: 85,
        // backgroundColor: '#0E2F71',
    },

    headingText: {
        fontSize: 40,
        fontFamily: 'Iceland-Regular',
        color: 'black'
    },
    errorMessage: {
        fontSize: 15,
        fontFamily: 'Iceland-Regular',
        color: 'red',
        marginBottom: 5,
    },
    inputContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'red'
    },
    headingContainer: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'yellow'
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
    roomSizeInputContainer: {
        width: '80%',
        height: 50,
        // backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    roomSizeText: {
        fontSize: 23,
        fontFamily: 'Iceland-Regular',
        color: 'black',
        // marginRight: 0,
        // backgroundColor: 'yellow',
    },
    roomSizeInput: {
        width: '60%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    plusMinusBtn: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#F2F2F2',
        // paddingTop: 5,
        borderRadius: 10,
    },
    plus: {
        fontSize: 30,
        color: 'black',
        // fontFamily: 'Iceland-Regular'
    },

    minus: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        // fontFamily: 'Iceland-Regular'
    },

    roomSize: {
        fontSize: 30,
        color: 'black',
        fontFamily: 'Iceland-Regular'
    },
    btn: {
        width: '80%',
        height: 69,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#0E2F71',
    },
    btntext: {
        fontSize: 32,
        fontFamily: 'Iceland-Regular'
    },
    boxshadow: {
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        elevation: 10,

    }

});

export default Host;