/**
 * Here you can define helper functions to use across your app.
 */

import Starship from "./custom/Starship";

async function _getStarshipCount() {
    const resp = await fetch('https://swapi.booost.bg/api/starships/');
    const data = await resp.json();
    const count = data.count;

    return count;
}

async function _createStarships() {
    let starships = []
    for (let i = 1; i <= 36; i++) {
        try {
            const resp = await fetch(`https://swapi.booost.bg/api/starships/${i}/`);
            const data = await resp.json();
            starships.push(data)
        } catch (error) {
            console.error(error)
        }
    }

    return starships;
}

function _validateData(arr) {
    let starships = []
    arr.forEach(element => {
        if(isConsumableValid(element) && isPassengerValid(element)) {
            let ship = new Starship(element.name,
                element.consumables, element.passengers);

            ship._consumables = parseConsumables(ship._consumables);
            ship._passengers = parseInt(ship._passengers.split(',').join(''))
            
            starships.push(ship);          
        }
    });

    return starships;
}

function isConsumableValid(obj) {
    if(obj.consumables !== undefined 
        && obj.consumables !== null 
        && obj.consumables !== 'unknown') {
            return true;
    }

    return false;
}

function isPassengerValid(obj) {
    if(obj.passengers !== undefined 
        && obj.passengers !== null 
        && obj.passengers !== 'n/a'
        && obj.passengers !== '0') {
            return true;
    }

    return false;
}

function parseConsumables(consumables) {
    let stringArr = consumables.split(' ')
    let num = 0
    if(stringArr[1] === 'year' || stringArr[1] === 'years') {
        num = +stringArr[0] * 365;
    }
    if(stringArr[1] === 'month' || stringArr[1] === 'months') {
        num = +stringArr[0] * 30;
    }
    if(stringArr[1] === 'week' || stringArr[1] === 'weeks') {
        num = +stringArr[0] * 7;
    }
    if(stringArr[1] === 'day' || stringArr[1] === 'days') {
        num = +stringArr[0];
    }

    return num;
}

export {_getStarshipCount, _createStarships, _validateData}