import React, { useState } from 'react';
import Screen from './Screen';
import Keypad from './Keypad';
import { Dimensions, Platform, StatusBar, StyleSheet, View } from 'react-native';

const PADDING_TOP = Platform.OS === 'android' ? StatusBar.currentHeight : 0
const SCREEN_PROP = 0.25;
const KEYPAD_PROP = 0.75 * (Dimensions.get('window').height - PADDING_TOP) / Dimensions.get('window').height;

const styles = StyleSheet.create({
    screen: {
        height: Dimensions.get('window').height * SCREEN_PROP
    },
    keypad: {
        height: Dimensions.get('window').height * KEYPAD_PROP
    },
    view: {
        paddingTop: PADDING_TOP
    }
});

const Calculator = () => {

    const [operation, setOperation] = useState('');
    const [result, setResult] = useState('');

    return(
        <View style={styles.view}>
            <Screen
                operation={operation}
                result={result}
                screenProp={SCREEN_PROP}
                style={styles.screen}
            />
            <Keypad
                operation={operation}
                result={result}
                screenProp={KEYPAD_PROP}
                setOperation={setOperation}
                setResult={setResult}
                style={styles.keypad}
            />
        </View>
    );
}

export default Calculator;
