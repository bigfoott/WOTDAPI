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
            var html = dom.window.document.documentElement.innerHTML;

            var word = html.split('<h2 class="wod-l-hover">')[1].split('</h2>')[0];
            var def = html.split('<div class="definition-block">')[1].split('<p>')[1].split('</p>')[0];
        
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
