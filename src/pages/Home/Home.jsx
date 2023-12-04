import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Home = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.upperContainer}>
                <Text style={styles.titleText}>DG BUZZER</Text>
            </View>
            <View style={styles.lowerContainer}>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[styles.btn, styles.hostBtn]}
                        onPress={() => navigation.navigate('Host')}>

                        <Text style={[styles.btntext, { color: 'white' }]}>Host</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, styles.joinBtn, styles.boxshadow]}
                        onPress={() => navigation.navigate('Join')}
                    >
                        <Text style={[styles.btntext, { color: 'black' }]}>Join</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={[styles.btn, styles.joinBtn, styles.boxshadow]}
                        onPress={() => navigation.navigate('NetworkInformation')}
                    >
                        <Text style={[styles.btntext, { color: 'black' }]}>NetworkInfo</Text>
                    </TouchableOpacity> */}

                </View>
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsText}>Host and Players must be connected to same wifi network</Text>
                </View>
                <View style={styles.gadsContainer}>
                    {/* <Text style={styles.gadsText}>Google Ads</Text> */}
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
        // backgroundColor: 'white',
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
        // fontWeight: 'bold',
        fontFamily: 'Iceland-Regular'
        // marginTop: 50,
    },
    lowerContainer: {
        // position: 'absolute',
        width: '100%',
        height: '80%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 85
    },
    btnContainer: {
        width: '60%',
        marginTop: 50,
        // height: '75%',
        // marginBottom: 20,
        // backgroundColor: 'yellow',
        justifyContent: 'center',
    },
    btn: {
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 35,

    },
    hostBtn: {
        backgroundColor: '#0E2F71',
    },
    joinBtn: {
        backgroundColor: 'white',
    },
    btntext: {
        color: 'white',
        fontSize: 32,
        fontFamily: 'Iceland-Regular'
    },
    instructionsContainer: {
        width: '90%',
        // height: '25%',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    instructionsText: {
        color: 'black',
        fontSize: 25,
        fontFamily: 'Iceland-Regular',
        textAlign: 'center',
    },
    gadsContainer: {
        width: '100%',
        height: '25%',
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gadsText: {
        color: 'black',
        fontSize: 25,
        fontFamily: 'Iceland-Regular'
    },
    boxshadow: {
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 10,

    }
});


export default Home; 