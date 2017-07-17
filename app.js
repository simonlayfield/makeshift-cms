const express = require('express')
const app = express()
const fs = require('fs')

app.use('/', (req, res) => {

    fs.readFile('pages/index.txt', 'utf8', function (err, data) {
        if (err) throw err;

        const dataArray = data.split('---'),
            dataResult = dataArray.map(part => {
                if (part.includes('title:')) {
                    part = part.replace('title:', '');
                    return '<h1>' + part + '</h1>';
                } else if (part.includes('content:')){
                    part = part.replace('content:', '');
                    return '<p>' + part + '</p>';
                } else {
                    return part;
                }
            });

        res.writeHead(200, {'Content-Type': 'text/html'});

        [].forEach.call(dataResult, (item, i) => {
            res.write(item);
        });

        res.end();

    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
