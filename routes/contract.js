var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var url = require('url');
var isSecure = require('./common').isSecure;
var isAuthenticated = require('./common').isAuthenticated;
var ecTo = 'http://ec2-52-78-70-38.ap-northeast-2.compute.amazonaws.com';
var ecToS = 'https://ec2-52-78-70-38.ap-northeast-2.compute.amazonaws.com';

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
        temp.user_id = fields.user_id;
        temp.here_lat = fields.here_lat;
        temp.here_lon = fields.here_lon;
        temp.addr_lat = fields.addr_lat;
        temp.addr_lon = fields.addr_lon;
        temp.rec_phone = fields.rec_phone;
        temp.price = fields.price;
        temp.info = fields.info;
        temp.memo = fields.memo;
        temp.pic = [];
        temp.pic.push(files.pic);
        if (files.pic) {
            var filename = path.basename(files.pic.path);
            temp.pic.push({fileUrl: url.resolve(ecTo, '/images/' + filename)});
        }
        res.send({
            result : {
                sending_id : 25,
                contract_id : 51
            }
        });

    });
}); // 9. 배송 요청 등록 및 미체결 계약 생성

router.get('/', isSecure, function(req, res, next) {
    var sender = req.query.delivering_id;
    if(req.url.match(/\/\?delivering_id=\d+/i)) {
        res.send({
            result: {
                sending_id: '1',
                contract_id: '22',
                name: '개똥이',
                here_lat: '37.455955',
                here_lon: '126.95366',
                addr_lat : '37.466286',
                addr_lon : '126.960546',
                info : "도자기",
                arr_time: "2016-08-01 10:30:00",
                rec_phone: "010-6351-5707",
                price: 5000,
                memo: "깨지기 쉬워요",
                pic: [
                    {
                        "originalFilename": "1.jpg",
                        "fileUrl": ecTo + '/images/upload_78f6eeaee4bc2c5e7bc0afad83220022.jpeg'
                    }
                ]
            }
        });
    } else {
        res.send({
            error : '배송 요청 보기에 실패했습니다'
        });
    }
}); // 10. 배송 요청 보기

router.put('/', function(req, res, next) {
        var contract_id = parseInt(req.body.contract_id);
        if (req.body.contract_id && req.body.state) {
            var state = parseInt(req.body.state);
            if (state === '1') { // 수락
                res.send({
                    result: { sending_id : 1 ,
                              sending_user_id : 1
                    }
                });
            } else if (state === '9') { // 거절
                res.send({
                    result: {message : '계약 체결을 거절했습니다. '}
                });
            } // elseif _9_
        } else if (req.body.contract_id && req.body.delivering_id) {
            var delivering_id = parseInt(req.body.delivering_id);
                res.send({
                    result: {message : '계약 신청에 성공했습니다.'}
                });
        } else {
            res.send({
                error : {message :'계약 체결 또는 계약 신청에 실패했습니다.'}
            });
        }
}); // 15. 계약 신청 및 체결하기

router.get('/:contract_id', isSecure, function(req, res, next) {
    var contract_id = req.params.contract_id;
    res.send({
        result : {
            contract_id : contract_id,
            sending_id : 1,
            sending_user_id : 25,
            delivering_id : 33,
            delivering_user_id : 1,
            req_time : '2016-08-24 18:01:00',
            res_time : '2016-08-24 19:30:00',
            state : 2
        }
    });
}); // 16. 계약 내역 보기

router.put('/:contract_id', function(req, res, next) {
    var contract_id = req.params.contract_id;
    var state = req.body.state;
    res.send({
        result : '계약 상태가 변경되었습니다.'
    });
}); // 15. 배송 상태 변경하기

module.exports = router;