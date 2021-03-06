var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var url = require('url');
var isSecure = require('./common').isSecure;
// var isAuthenticated = require('./common').isAuthenticated;
var ecTo = 'http://ec2-52-78-70-38.ap-northeast-2.compute.amazonaws.com:80';

router.post('/', isSecure, function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '../uploads/images/menus');
    form.parse(req, function(err, fields, files) {
        if (err) {
            return next(err);
        }
        var temp = {};
        var boardType = parseInt(fields.boardType);
        temp.boardType = boardType;
        temp.name = fields.name;
        temp.title = fields.title;
        temp.content = fields.content;
        temp.esType = fields.esType;
        temp.pic = [];

        if (files.pic instanceof Array) {
            temp.pic = files.pic;
        } else if (files.pic) {
            temp.pic.push(files.pic);
        }
        if (files.pic) {
            var filename = path.basename(files.pic.path);
            temp.pic.push({fileUrl: url.resolve(ecTo, '/images/' + filename)});
        }

        if (boardType === 0) { // 칭찬
            res.send({
                result : '칭찬이 성공적으로 등록되었습니다.'
            });
        } else if (boardType === 1) { // 신고
            res.send({
                result : '신고가 성공적으로 등록되었습니다.'
            });
        } else if (boardType === 2) { // 문의
            res.send({
                result : '문의가 성공적으로 등록되었습니다.'
            });
        } else {
            res.send({
               error : '칭찬/신고 등록을 실패했습니다.'
            });
        }
    });
});

module.exports = router;