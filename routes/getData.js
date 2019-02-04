var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var createError = require('http-errors');
var request = require('request');

router.get('/fetch',(req,res,next)=>{
    var id = req.query.id || 152395;

});