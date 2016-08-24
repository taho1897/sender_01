var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var nickname = req.body.nickname;
    var esType = req.body.esType;
    var boardType = req.body.boardType;
    var title = req.body.title;
    var content = req.body.content;
    var pic = req.body.pic;

});

module.exports = router;