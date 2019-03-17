import {data} from './database.js';

var LIMIT = 2;

var index = 0;
var db = [];
var results = [];

function init() {
    return new Promise((resolve, reject) => {
        db = shuffle(data)
        setupFolder(0)
    })
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function makeid(length) {
    var text = "";
    var possible = "ABCDEF0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

function setupFolder(index) {
    var doc = document.querySelector(".documentation")
    doc.querySelector('h6').innerHTML = "SCP-" + db[index].id
    doc.querySelector('p').innerHTML = db[index].text

    var report = document.querySelector(".report")
    report.querySelector('h6').innerHTML = "Report #"+makeid(12)
    report.querySelector('p').innerHTML = db[index].report
}

function next(isReal) {
    if (isReal != db[index].isReal) {
        results.push({
            id: db[index].id, 
            isReal: db[index].isReal, 
            answer: isReal
        })
    }

    if (index >= LIMIT - 1) {
        return false
    } else {
        index += 1
        setupFolder(index)

        return true
    }
}

export {init, next, results};