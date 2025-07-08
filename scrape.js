const fs = require('fs');
const jsd = require('jsdom');
const { JSDOM } = jsd;
const https = require('https');

function process(dom, event) {
    
}

function main()
{
    if (!fs.existsSync('files'))
        fs.mkdirSync('files');
    
    return new Promise(resolve => {
        JSDOM.fromURL("https://www.merriam-webster.com/word-of-the-day/calendar", {
        })
        .then((dom) => {
            console.log("1 " + dom);
            console.log("2 " + dom.window);
            console.log("3 " + dom.window.document);
            console.log("4 " + dom.window.document.documentElement);
            console.log("5 " + dom.window.document.documentElement.innerHTML);
            
            var container = dom.window.document.getElementsByClassName("slick-current")[0];

            var word = container.getElementsByClassName("wod-l-hover")[0].innerText;
            var def = container.getElementsByClassName("definition-block").innerText;
        
            fs.writeFile('files/word.json', '{"word": "' + word + '", "def": "' + def + '"}', err => {
                if (err) {
                    console.error(err);
                    return;
                }
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
