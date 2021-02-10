import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const OP_PROP = 0.4;
const RESULT_PROP = 0.6;

const styles = (screenProp) => StyleSheet.create({
    op: {
        height: Dimensions.get('window').height * screenProp * OP_PROP,
        fontSize: Dimensions.get('window').height * screenProp * OP_PROP * 0.5,
        textAlignVertical: 'bottom',
        textAlign: 'right',
        color: '#4d4d4d'
    },
    result: {
        height: Dimensions.get('window').height * screenProp * RESULT_PROP,
        fontSize: Dimensions.get('window').height * screenProp * RESULT_PROP * 0.5,
        textAlignVertical: 'center',
        borderTopWidth: 1,
        borderColor: '#efefef',
        color: '#393939',
        textAlign: 'right'
    }
});

const Screen = ({operation, result, screenProp}) => {
    return (
        <View>
            <Text
                style={styles(screenProp).op}
            >
                {operation}
            </Text>
            <Text
                style={styles(screenProp).result}
            >
                {result}
            </Text>
        </View>
    )
}

export default Screen;