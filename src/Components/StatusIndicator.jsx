import { View, Text, StyleSheet } from "react-native";

const StatusIndicator = (props) => {
    return (
        <View style={[styles.statusIndicator, { backgroundColor: props.color }]}>
            <Text style={styles.statusIndicatorText}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    statusIndicator: {
        width: '45%',
        height: '80%',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusIndicatorText: {
        fontSize: 16,
        fontFamily: 'Iceland-Regular',
        color: 'white',
    },

})

export default StatusIndicator;