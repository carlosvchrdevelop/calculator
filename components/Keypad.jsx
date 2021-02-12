import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import CalcButton from './CalcButton';
import { checkKey, resolve, fixUnclosedParenthesis, getAvaibleKeys } from '../lib/calulator';

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
        if(!checkKey(value, operation)) return;
        switch (value){
            case 'C':
                setOperation('');
                break;
            case '←':
                setOperation((current) => {
                    if(current.length === 0) return current;
                    let nchars = 1;
                    if(current.endsWith('log(')) nchars = 4;
                    if(current.endsWith('^(')) nchars = 2;
                    if(current.endsWith('√(')) nchars = 2;
                    return current.substring(0, current.length-nchars);
                });
                break;
            case '=':
                let fixOp = fixUnclosedParenthesis(operation);
                setOperation(fixOp)
                resolve(fixOp);
                break;
            case 'lg':
                setOperation((current) => {
                    return current + 'log(';
                });
                break;
            case '√':
                setOperation((current) => {
                    return current + '√(';
                });
                break;
            case '^':
                setOperation((current) => {
                    return current + '^(';
                });
                break;
            default:
                setOperation((current) => {
                    return current + value;
                });
        }
    };

    const keys = ['(',')','lg','C',
                 '^','√','%','/',
                 '7','8','9','x',
                 '4','5','6','-',
                 '1','2','3','+',
                 '←','0',',','='];

    const avaibleKeys = getAvaibleKeys(keys, operation);

    const buttons = keys.map((v) => {
                        return (
                            <CalcButton
                                callback={addValue}
                                height={HEIGHT*screenProp}
                                key={v} 
                                value={v}
                                width={WIDTH}
                                enabled={avaibleKeys.includes(v)}
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