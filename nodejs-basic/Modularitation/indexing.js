const Tiger = require('./tiger');
const Wolf = require('./wolf');

const fighting = (tiger, wolf) => {
    if(tiger.strength > wolf.strength){
        tiger.growl();
        return
    }
    else if(tiger.strength < wolf.strength){
        wolf.howl();
        return
    }
    else{
        console.log('Tiger and wolf have same srength');

    }
}

const tiger = new Tiger();
const wolf = new Wolf();

fighting(tiger,wolf);