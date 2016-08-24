var express = require('express');
var router = express.Router();

router.put('/', function(req, res, next) {
    var phone = req.body.phone;
    if (phone !== undefined) {
        req.send({
            message: phone + ': dummy 사용자 등록을 성공했습니다.'
        });
    } else {
        req.send({
            message: 'dummy 사용자 등록을 실패했습니다.'
        });
    }
}); // 2. 핸드폰 번호 등록

router.get('/me', function(req, res, next) {
    req.send({
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

router.get('/:user_id', function(req, res, next) {
    var userId = req.params.user_id;
    req.send({
        result : {
            user_id: 2,
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
        if (files.photos) {
            menu.files.push(files.photos);
            form.uploadDir = path.join(__dirname, '../uploads/images/menus');
            res.send({
                message: '프로필 사진의 변경을 성공하였습니다.'
            });
        } else {
            res.send({
                error : '프로필 사진의 변경을 실패했습니다.'
            });
        }
    });
}); // 5. 자신의 프로필 사진 변경 하기

router.get('/logout', function(req, res, next) {

}); // 6. 로그아웃

router.delete('/', function(req, res, next) {

}); // 7. 회원 탈퇴 하기