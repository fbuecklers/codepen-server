#!/usr/bin/env node
"use strict";

var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.argv[2] || 8080;
var data = 'book.json';

var book = fetch(); 
// Object.keys(book) = [1,2,4,5,3]
//var ids = Object.keys(book).reduce(function(result, val) {
//  // return result > val? result: val;
//  return Math.max(result, val);
//}, 0);
var ids = Object.keys(book).reduce(Math.max.bind(Math), 0);

app.use(bodyParser.json());

app.use(function(req, res, next) {
  var origin = req.get('Origin');
  if (origin) {    
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, POST, PUT, DELETE, PATCH');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
  }
  next();
});

app.get('/book', function(req, res) {
  var arr = Object.keys(book).map(function(key) {
    return book[key];
  });
  
  res.status(200).send(arr); 
});

app.post("/book", function(req, res) {
  var address = req.body;
  
  address.id = ++ids;
  book[address.id] = address;

  save(book);
  
  res.status(201).send(address);
});

app.get("/book/:id", function(req, res) {
  var id = req.params.id;
  var address = book[id];
  
  if (address) {
    res.status(200).send(address);
  } else {
    res.status(404).send();
  }
});

app.put("/book/:id", function(req, res) {
  var address = req.body;
  book[address.id] = address;
  
  save(book);
  
  res.status(204).send();
});

app.delete("/book/:id", function(req, res) {
  var id = req.params.id;
  delete book[id];
  
  save(book);
  
  res.status(204).send();
});

app.listen(port, function() {
  console.log("started node http server on port: " + port);
});

function fetch() {
  try {
    return JSON.parse(fs.readFileSync(data));
  } catch (e) {
    console.log('No data found in: ' + data);
    return {};
  }
}

function save(book) {
  fs.writeFile(data, JSON.stringify(book, null, '  '), function(err) {
    if (err) throw err;
  });
}