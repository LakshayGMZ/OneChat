const crypto = require("crypto");
var FlakeId = require('flake-idgen');
var flakeIdGen = new FlakeId;

const id = crypto.randomBytes(64).toString("hex");

console.log(id);

console.log(String(parseInt(new Date().getTime()/1000)));

const typedArray = new Uint8Array(10);
const randomValues = crypto.getRandomValues(typedArray).join('');
//console.log(randomValues);

function work() {
    console.log(parseInt(flakeIdGen.next()));

    setTimeout(work, 2000);
}

work();