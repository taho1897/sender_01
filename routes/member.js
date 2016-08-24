var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var async = require('async');
var url = require('url');

router.put('/', function(req, res, next) {
    var phone = req.body.phone;
    if (phone !== undefined) {
        res.send({
            message: phone + ': dummy 사용자 등록을 성공했습니다.'
        });
    } else {
        res.send({
            message: 'dummy 사용자 등록을 실패했습니다.'
        });
    }
}); // 2. 핸드폰 번호 등록

router.get('/me', function(req, res, next) {
    res.send({
        result: {
            user_id : 1,
            name : '홍길동',
            email : 'hong123@hwalbin.com',
            phone : "010-1234-5678",
            introduction : '저는 안산에 살고 있습니다.', // 자기소개 내용
            deliver_com : 1, //배달 완료 횟수
            deliver_req : 5, // 배달 요청 횟수
            pic : 'http://localhost:3000/images/upload_20c413748c8b88ae38a10c03370cc850.jpg',
            activation : 1 // 활성화 유무
        }
    });
}); // 3. 자신의 정보 보기

router.get('/logout', function(req, res, next) {
    req.logout();
    res.send({ message : '로그아웃했습니다.' });
}); // 6. 로그아웃

router.get('/:user_id', function(req, res, next) {
    var userId = req.params.user_id;
    res.send({
        result : {
            user_id: userId,
            name: '홍길동생',
            email: 'hongsang@hwalbin.com',
            phone: '010-1111-1111',
            introduction: '나는 홍길동의 동생입니다.',
            deliver_com: 3,
            deliver_req: 1,
            pic: 'http://localhost:3000/images/upload_01bd18c7dd4fa45013be85aef8ed10a5.jpg',
            activation: 1
        }
    });
}); // 4. 특정 사용자의 정보 보기

router.put('/me', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;
    form.parse(req, function(err, fields, files) {
        if (err) {return next(err);}
        var menu = {};
        menu.files = [];
            menu.files.push(files.photos);
            var filename = path.basename(files.photos.path);
            menu.files.push({url : url.resolve('http://localhost:3000','/images/'+filename)});
            form.uploadDir = path.join(__dirname, '../uploads/images/menus');
            res.send({
                message: '프로필 사진의 변경을 성공하였습니다.',
                result : menu
            });
    });
}); // 5. 자신의 프로필 사진 변경 하기

/*        if (files.photos) {
            menu.files.push(files.photos);
            var filename = path.basename(files.photos.path);
            menu.files.push({url : url.resolve('http://localhost:3000','/images/'+filename)});
            res.send({
                message : '프로필 사진의 변경을 성공하였습니다.',
                result : menu
            });
        } else {
            res.send({
                error : '프로필 사진의 변경을 실패했습니다.'
            });
        }*/

router.delete('/', function(req, res, next) {
    var userId = req.body.user_id;
    res.send({ message: userId +' : 회원 탈퇴가 처리되었습니다.' });
}); // 7. 회원 탈퇴 하기

module.exports = router;