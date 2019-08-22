import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity
} from 'react-native';

const ARButton = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <TouchableOpacity>
                <View style={styles.container}>
                    <Title />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const Title = () => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.buttonLabel}>
                TRY!
            </Text>
            <Text style={styles.buttonARLabel}>
                AR
            </Text>
            <Text style={styles.buttonLabel}>
                CAMERA
            </Text>
        </View>
    );
};

export default ARButton;

const styles = StyleSheet.create({
    safeContainer: {
        width: '100%',
        backgroundColor: 'rgb(195, 82, 76)'
    },
    container: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    buttonLabel: {
        color: 'white'
    },
    buttonARLabel: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'rgb(195, 82, 76)',
        textAlign: 'center',
        marginHorizontal: 10,
        padding: 5,
        opacity: 0.8
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});