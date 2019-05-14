const bookmarkleter = require('bookmarkleter');
const fs = require('fs');
const code = fs.readFileSync("./src/elec2019.js").toString('utf-8');
const bookmarklet = bookmarkleter(code, {urlencode: false, minify: true, iife: true});
console.log(bookmarklet);
