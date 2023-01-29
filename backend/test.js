const { customAlphabet } = require('nanoid');
const numbers = '0123456789';

function genID() {
    const nanoid = customAlphabet(numbers, 19);
    return nanoid();
    
}

export default genID