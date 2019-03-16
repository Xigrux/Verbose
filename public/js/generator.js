import * as database from './database.js';

function init() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("generator init")
            resolve()
        }, 10000);
    })
}

export {init};