const http = require("http");
const fs = require("fs");
const path = require("path");

const pages = path.resolve(path.join(__dirname,'SRC'));

const os = require('os');

let port = parseInt(process.env.PORT) || 8000;

function serr(res, err){
res.writeHead(500, {'Content-Type': 'text/plain'});
res.end('server error \nan error occored in the server');
console.log(`ERROR: an error occored generating responce: ${err}`);
}

async function serve_html(res, file_name) {
fs.readFile(path.join(pages, file_name), (err, data) => {
if (err) {
serr(res, err);
} else {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end(data);
console.log(`INFO: responce 200 OK ${file_name}`);
}
});
}

async function serve_img(res, file_name) {
fs.readFile(path.join(pages, file_name), (err, data) => {
if (err) {
serr(res, err);
} else {
res.writeHead(200, {'Content-Type': `image/${path.extname(file_name).split('.')[1]}`});
res.end(data);
console.log(`INFO: responce 200 OK ${file_name}`);
}
});
}

async function server(req,res) {
console.log(`\n\nINFO: request ${req.method} ${req.url}`);
switch (req.url) {
case '/report':
{
await serve_html(res, 'report.html');
}
break;
case '/404':
{
await serve_html(res, '404.html');
}
break;
case '/app':
{
await serve_html(res, 'app.html');
}
break;
case '/capcut':
{
await serve_html(res, 'capcut.html');
}
break;
case '/facebok':
{
await serve_html(res, 'facebok.html');
}
break;
case '/googledrive':
{
await serve_html(res, 'googledrive.html');
}
break;
case '/hentai':
{
await serve_html(res, 'hentai.html');
}
break;
case '/insta':
{
await serve_html(res, 'insta.html');
}
break;
case '/':
{
await serve_html(res, 'main.html');
}
break;
case '/mediafile':
{
await serve_html(res, 'mediafile.html');
}
break;
case '/menu':
{
await serve_html(res, 'menu.html');
}
break;
case '/snapchat':
{
await serve_html(res, 'snapchat.html');
}
break;
case '/info':
{
await serve_html(res, 'info.html');
}
break;
case '/tiktok':
{
await serve_html(res, 'tiktok.html');
}
break;
case '/twitter':
{
await serve_html(res, 'twitter.html');
}
break;
case '/xnx':
{
await serve_html(res, 'xnx.html');
}
break;
case '/xvideo':
{
await serve_html(res, 'xvideo.html');
}
break;
case '/youtube':
{
await serve_html(res, 'youtube.html');
}
break;

// favicon and static icons
case '/favicon.ico':
{
await serve_img(res, 'favicon.ico');
}
break;
case '/favicon-32x32.png':
{
await serve_img(res, 'favicon-32x32.png');
}
break;
case '/favicon-16x16.png':
{
await serve_img(res, 'favicon-16x16.png');
}
break;
case '/apple-touch-icon.png':
{
await serve_img(res, 'apple-touch-icon.png');
}
break;
case '/android-chrome-512x512.png':
{
await serve_img(res, 'android-chrome-512x512.png');
}
break;
case '/android-chrome-192x192.png':
{
await serve_img(res, 'android-chrome-192x192.png');
}
break;

// ICON jpgs
case '/404.jpg':
case '/app.jpg':
case '/capcut.jpg':
case '/facebok.jpg':
case '/googledrive.jpg':
case '/hentai.jpg':
case '/insta.jpg':
case '/main.jpg':
case '/mediafile.jpg':
case '/menu.jpg':
case '/snapchat.jpg':
case '/support.jpg':
case '/tiktok.jpg':
case '/twitter.jpg':
case '/xnx.jpg':
case '/xvideo.jpg':
case '/youtube.jpg':
{
await serve_img(res, path.join('IMAGES', req.url.slice(1)));
}
break;

case '/site.webmanifest':
{
fs.readFile(path.join(pages, 'site.webmanifest'), (err, data) => {
if (err) {
serr(res, err);
} else {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end(data);
}
});
}
break;

default:
{
fs.readFile(path.join(pages, '404.html'), (err, data) => {
if (err) {
serr(res, err);
} else {
console.error(`${req.url} NOT FOUND`);
res.writeHead(404, {'Content-Type': 'text/html'});
res.end(data);
console.log(`INFO: responce 404 NOT_FOUND 404.html`);
}
});
}
}
}

if (isNaN(port)) {
console.warn(`WARNING: invalid port ${port}`);
port = 8000
}

const s = http.createServer(server);
s.listen(port, () => {
console.log(`INFO: server started at http://${os.hostname()}`);
console.log(`INFO: server listening at port ${port}`);
console.log(`INFO: view website at http://${os.hostname()}:${port}`);
});

process.on('SIGINT', () => {
console.log('INFO: server shutting down...');
s.close(() => process.exit(1));
})
