const fs = require('fs');
const jsd = require('jsdom');
const { JSDOM } = jsd;
const https = require('https');

function process(dom, event) {
    var container = dom.window.document.getElementById("slick-slide00");

    var word = container.getElementsByClassName("wod-l-hover")[0].innerText;
    var def = container.getElementsByClassName("definition-block").innerText;

    fs.writeFile('files/word.json', '{"word": "' + word + '", "def": "' + def + '"}', err => {
        if (err) {
            console.error(err);
            return;
        }
    });
}

function main()
{
    if (!fs.existsSync('files'))
        fs.mkdirSync('files');
    
    return new Promise(resolve => {
        JSDOM.fromURL("https://www.merriam-webster.com/word-of-the-day/calendar", {
        })
        .then((dom) => {

            dom.window.addEventListener('DOMContentLoaded', event => {
                dom.window.addEventListener('load', event => process(dom, event));
            });
        }).catch(_err =>
            {
                console.log(_err);
            });
    })
}

try
{
    main();
}
catch (e)
{
    console.error("ERROR: " + e);
    process.exit(1);
}
