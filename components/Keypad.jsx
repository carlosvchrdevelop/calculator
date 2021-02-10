import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import CalcButton from './CalcButton';

const COLS = 4;
const ROWS = 6;
const WIDTH = Dimensions.get('window').width / COLS;
const HEIGHT = Dimensions.get('window').height / ROWS;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

const Keypad = ({operation, setOperation, result, setResult, screenProp}) => {

    const addValue = (value) => {
        if(!checkKey(value)) return;
        switch (value){
            case 'C':
                setOperation('');
                break;
            case '←':
                setOperation((current) => {
                    return current.substring(0, current.length-1);
                });
                break;
            case '=':
                resolve();
                break;
            case 'lg':
                setOperation((current) => {
                    return current + 'log(';
                });
                break;
            default:
                setOperation((current) => {
                    return current + value;
                });
        }
    };

    const resolve = () => {
        // TODO: Termianar resolve function
    }

    const checkKey = (value) => {
        // TODO: Agregar reglas de validación
        return true;
    }

    const buttons = ['(',')','lg','C',
                    '^','√','%','/',
                    '7','8','9','x',
                    '4','5','6','-',
                    '1','2','3','+',
                    '←','0',',','='].map((v) => {
                        return (
                            <CalcButton
                                callback={addValue}
                                height={HEIGHT*screenProp}
                                key={v} 
                                value={v}
                                width={WIDTH}
                            />
                        );
                    });

    return (
        <View style={styles.container}>
            {buttons}
        </View>
    );
}

export default Keypad;