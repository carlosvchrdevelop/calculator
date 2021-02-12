import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

const styles = (width, height, enabled) => StyleSheet.create({
    btn: {
        backgroundColor: enabled ? '#f4f4f4' : '#dbdbdb',
        height: height,
        justifyContent: 'center',
        width: width
    },
    txt: {
        color: '#3e3e3e',
        fontSize: height/3,
        textAlign: 'center'
    }
});


const CalcButton = ({value, width, height, callback, enabled}) => {
    return (
        <TouchableHighlight 
            onPress={() => callback(value)}
            style={styles(width, height, enabled).btn}
            underlayColor='#78909C'
        >
            <Text style={styles(width, height, enabled).txt}>{value}</Text>
        </TouchableHighlight>
    );
}

export default CalcButton;