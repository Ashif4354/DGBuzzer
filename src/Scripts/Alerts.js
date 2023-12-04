import { Alert } from 'react-native';

const backButtonAlert = (navigation, actor, e) => {
    // console.log('in backButtonAlertHostRoom', e.data.action);
    const message = (actor === 'host') ? "Are you sure you want to close the room?" : "Are you sure you want to exit the room?"
    
    Alert.alert(
        "Exit Room",
        message,
        [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Yes",
                onPress: () => {
                    navigation.dispatch(e.data.action);
                    // navigation.popToTop();
                }
            }
        ]
    );
}

export { backButtonAlert }