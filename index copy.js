const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

//---------------------------------------- READING FILES
const data = fs.readFileSync(`${__dirname}/dev_data/data.json`, 'utf8');

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/temp_overview.html`,
  'utf-8'
);
const tempAlbum = fs.readFileSync(
  `${__dirname}/templates/temp_album.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/temp_card.html`,
  'utf-8'
);

const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //---------------------------------------- OVERVIEW
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join('');

    const output = tempOverview.replace('{%TEMP_CARD%}', cardsHtml);

    res.end(output);
  }

  //---------------------------------------- ALBUM
  else if (pathname === '/album') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const album = dataObject[query.id];
    const output = replaceTemplate(tempAlbum, album);
    res.end(output);
  }

  //---------------------------------------- API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  }

  //---------------------------------------- 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
