const { EventEmitter} = require('events');
const myEventEmitter = new EventEmitter();

const birthdayEvent = ({name}) => {
    console.log("Happy bithday " + name);
}

myEventEmitter.on('birthday', birthdayEvent);
myEventEmitter.emit('birthday', {name: 'Ivan'});