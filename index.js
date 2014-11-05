#!/usr/bin/env node
"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.argv[2] || 8080;

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

var ids = 1;
var book = {};

app.get('/book', function(req, res) {
  var arr = Object.keys(book).map(function(key) {
    return book[key];
  });
  
  res.status(200).send(arr); 
});

app.post("/book", function(req, res) {
  var address = req.body;
  
  address.id = ids++;
  book[address.id] = address;

  res.status(201).send(address);
});

app.listen(port, function() {
  console.log("started node http server on port: " + port);
});