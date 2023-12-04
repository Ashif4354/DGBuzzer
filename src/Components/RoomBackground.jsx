import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RoomBackground = () => {
    return (
        <>
            <View style={styles.upperContainer}>
                <Text style={styles.titleText}>DG BUZZER</Text>
            </View>
            <View style={[styles.lowerContainer, styles.boxshadow]}>
            </View>
        </>

    );
};
const styles = StyleSheet.create({
    upperContainer: {
        width: '100%',
        height: '20%'
    },
    titleText: {
        color: 'white',
        fontSize: 35,
        fontFamily: 'Iceland-Regular',
        textAlign: 'center',
        top: 30,
    },
    lowerContainer: {
        width: '100%',
        height: '80%',
        backgroundColor: '#051E4D',
    },
    boxshadow: {

    },
});
export default RoomBackground;
