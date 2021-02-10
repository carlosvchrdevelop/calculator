import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

const styles = (width, height) => StyleSheet.create({
    btn: {
        backgroundColor: '#f4f4f4',
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


const CalcButton = ({value, width, height, callback}) => {
    return (
        <TouchableHighlight 
            onPress={() => callback(value)}
            style={styles(width, height).btn}
            underlayColor='#78909C'
        >
            <Text style={styles(width, height).txt}>{value}</Text>
        </TouchableHighlight>
    );
}

export default CalcButton;