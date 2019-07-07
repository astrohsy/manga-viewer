const remote = require('electron').remote;
const fs = remote.require('fs');
const path = remote.require('path');
let $ = require('jquery');

const baseLocation = './manga-1';

let chapter = 10;
let index = 0;
let context = null;

const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())
const chapters = dirs(baseLocation).sort((x,y) => {
    if (x.length === y.length) {
        return x > y ? 1 : -1
    }
    return x.length < y.length ? -1 : 1;
})

const contexts = []
for (let i of chapters) {
    const loc = baseLocation + '/' + i;
    const tmp = fs.readdirSync(loc);
    contexts.push(tmp);
}


$(window).on('load', () => {
    $('.panel-container').append(chapters.map((x, i) => { return $(`<div id=${'item-' + i} class="items">${x}</div>`).click(() => {
        $('#item-' + chapter).removeClass('active')
        $('#item-' + i).addClass('active');
        chapter = i;
        index = 0;
        context = contexts[chapter];

        const loc = baseLocation + '/' + chapters[chapter]
        const pic = 'file://' + __dirname + '/../' + loc + '/' + context[index+1]
        const pic2 = 'file://' + __dirname + '/../' + loc + '/' + context[index]
        $('.left-container').empty().append(`<img src=${pic} />`)
        $('.right-container').empty().append(`<img src=${pic2} />`)
    
    }) }))
    const loc = baseLocation + '/' + chapters[chapter];
    const t = fs.readdirSync(loc);
    const pic = 'file://' + __dirname + '/../' + loc + '/' + t[1]
    const pic2 = 'file://' + __dirname + '/../' + loc + '/' + t[0]
    $('.left-container').append(`<img src=${pic} />`)
    $('.right-container').append(`<img src=${pic2} />`)
})

$(document).keydown((e) => {
    if (e.keyCode == '37') {
        index = index - 2;
        index = Math.max(0, index);
    }
    else if (e.keyCode == '39') {
        index = index + 2;
    }

    const loc = baseLocation + '/' + chapters[chapter];

    const pic = 'file://' + __dirname + '/../' + loc + '/' + context[index+1]
    const pic2 = 'file://' + __dirname + '/../' + loc + '/' + context[index]
    $('.left-container').empty().append(`<img src=${pic} />`)
    $('.right-container').empty().append(`<img src=${pic2} />`)

});