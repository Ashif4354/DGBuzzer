import Sound from 'react-native-sound';


class BuzzerSound {
    constructor() {
        this.soundFile = new Sound('buzzer.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return
            }
        })
    }

    play() {
        this.soundFile.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        })
    }

}

export { BuzzerSound }