var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var url = require('url');
var isSecure = require('./common').isSecure;
var isAuthenticated = require('./common').isAuthenticated;
var ecTo = 'http://ec2-52-78-70-38.ap-northeast-2.compute.amazonaws.com:80';

router.post('/', isSecure, function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '../uploads/images/menus');
    form.parse(req, function(err, fields, files) {
        if (err) { return next(err);}
        var data = {};
        data.receiverId = fields.receiver_id;
        data.name = fields.name;
        data.message = fields.message;
        if (files.pic) {
            var filename = path.basename(files.pic.path);
            data.fileUrl =  url.resolve(ecTo, '/images/' + filename);
        }
        res.send({
            result : data
        });
    });
});

router.get('/' ,isSecure, function(req, res,next){
    var sender = {};
    sender.id = 97;
    sender.name = '지용운';
    sender.fileUrl = ecTo + '/images/upload_01bd18c7dd4fa45013be85aef8ed10a5.jpg';
    res.send({
      result : [
          {
              sender: sender,
              message : '자니?',
              date : '2016-08-29 13:20:11'
          }
          ]
   });
});

module.exports = router;
