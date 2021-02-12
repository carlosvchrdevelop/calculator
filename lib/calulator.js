const operators = ['+', '-', 'x', '/', 'lg', '√', '%', '^']

export const resolve = (op) => {
    op = fixUnclosedParenthesis(op);
    // TODO: Resolver operación
}

/** Agrega al final de la operación todos los paréntesis de cierre que falten */
export const fixUnclosedParenthesis = (op) => {
    while(hasUnclosedParenthesis(op)){
        op += ')';
    }
    return op;
}

/** Devuelve true si hay paréntesis de apertura aún sin cerrar */
const hasUnclosedParenthesis = (op) => {
    return op.split('(').length > op.split(')').length;
}

/** Dada una operación, comprueba si el último carácter es un cero a la izquierda */
const isLeftZero = (op) => {
    // Comprobamos que no es cadena vacía, sino no es 0 a la izq
    if(op.length === 0) return false;
    // Comprobamos que el último carácter es un 0, sino, no es 0 a la izq
    if(op[op.length-1] !== '0') return false;
    // Si la cadena solo contiene un dígito (0) se considera 0 a la izq
    if(op.length === 1) return true;
    // Si el penúltimo carácter es una coma, no se considera 0 a la izq
    if(op[op.length-2] === ',') return false;
    // Si el penúltimo carácter es un número, no se considera 0 a la izq
    if(!isNaN(op[op.length-2])) return false;
    // Si el penúltimo carácter es otra cosa (un operador o paréntesis), se considera 0 a la izq
    return true;
}

export const getAvaibleKeys = (keys, op) => {
    return keys.filter((v) => {
        return checkKey(v, op);
    });
}

/** Comprueba que si se introduce una coma, el número no tuviera ya una previamente */
const hasCommaAlready = (op) => {
    const commaSplitted = op.split(',');
    if(commaSplitted.length < 2) return false;
    return !isNaN(commaSplitted[commaSplitted.length-1]);
}

export const checkKey = (v, op) => {
    let notValidChars = [];
    const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    /** Comprobación para el primer carácter de la operación */
    if(op.length === 0) return !['^', ')', '/', 'x', '+', ',', '%'].includes(v);

    /** Si el nuevo carácter es coma, comprobamos si el número tenía una ya asignada */
    if(v === ',' && hasCommaAlready(op)) return false;

    /** si el nuevo carácter es un paréntesis de cierre, comprobamos que haya algún paréntesis de apertura sin cerrar */
    if(v === ')' && !hasUnclosedParenthesis(op)) return false;

    const lastChar = op.substring(op.length-1, op.length);

    switch(lastChar){
        case '(':
            notValidChars = ['+', 'x', '/', '%', '^', ',', ')'];
            break;
        case ')':
            notValidChars = [...numeros, '(', 'lg', '√', ','];
            break;
        case ',':
            notValidChars = ['(', ')', 'lg', '^', '√', '%', '+', '-', 'x', '/', ','];
            break;
        case '+': case 'x': case '/':
            notValidChars = [')', '^', '%', ',', '+', 'x', '/'];
            break;
        case '-':
            notValidChars = [')', '^', '%', ',', '-', '+', 'x', '/'];
            break;
        case '%':
            notValidChars = [...numeros, '(', 'lg', '%', '√', ','];
            break;
        case '0':
            notValidChars = isLeftZero(op)
                ? [...numeros, '(', 'lg', '√']
                : ['(', 'lg', '√'];
            break;
        default: // resto de números: del 1 al 9
            notValidChars = ['(', 'lg', '√'];
            break;

        // √, ^ y lg no hace falta porque llevan siempre paréntesis (
    }

    // Si nuevo carácter es uno no válido retornamos false
    return !notValidChars.includes(v);
}