var express = require('express');
var router = express.Router();
var events = require('events');
var fs = require('fs');
var eventsEmitter = new events.EventEmitter();
eventsEmitter.on('read', readFileContent);
eventsEmitter.on('show', showData);
eventsEmitter.on('check', checkData);
eventsEmitter.on('success', successFuction);
eventsEmitter.on('failed', failFunction);
eventsEmitter.on('finish', finishedFunction);
function readFileContent(fileName) {
  
    console.log(`Reading ${fileName} started!`);
  
    fs.readFile(fileName, 'utf8', (error, data) => {
      
        if (error) {
          
            console.log(error);
          
        } eventsEmitter.emit('show', data);
      
    });
  
}
function showData(data) {
  
    console.log('-------- [ File Data ] ---------');
  
    console.log(data);
  
    eventsEmitter.emit('check', data);
  
}
function checkData(data) {
  
    console.log('-------- Scanning Data ---------');
  
    if (data && data.includes("virus")) {
    
        eventsEmitter.emit('success');
      
    } else {
      
        eventsEmitter.emit('failed');
      
    }
  
}
function successFuction() {
  
    console.log('Malware has been detected!');
  
    eventsEmitter.emit('finish');
  
}
function failFunction() {
  
    console.log('No virus detected!');
  
    eventsEmitter.emit('finish');
  
}
function finishedFunction() {
  
    console.log('-------- Scanning Completed Successfully --------');
  
}
router.get('/', (req, res) => {
    eventsEmitter.emit('read', 'file.txt');
});
module.exports = router;