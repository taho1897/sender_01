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
        if (err) {return next(err);}
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
        var filename = path.basename(files.pic.path);
        temp.pic.push({url : url.resolve(ecTo,'/images/'+filename)});
        res.send({
            result : {
                sending_id : 25,
                contract_id : 51
            },
            temp : temp
        });

    });
}); // 8. 배송 요청 등록 및 미체결 계약 생성

router.get('/', isSecure, function(req, res, next) {
    var sender = req.query.sender;
    if(req.url.match(/\/\?sender=\d+/i)) {
        res.send({
            result: {
                sending_id: '1',
                nickname: '개똥이',
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
                    "fileUrl": "http://localhost:8080/sending_images/1.jpg"
                }
            ]
        }




        });
    } else {
        res.send({
            error : '배송 요청 보기에 실패했습니다'
        });
    }
}); // 9. 배송 요청 보기

router.get('/delivering', isSecure, function(req, res, next) {
    var currentPage = parseInt(req.query.currentPage) || 1;
    var itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    if (req.url.match(/\?currentPage=\d+&itemsPerPage=\d+/i)) {
        res.send({
            result: {
                totalPage: 10,
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                data: [{
                    delivering_id: 1,
                    user_id: 1,
                    nickname: "젠가",
                    here_lat: '37.476807',
                    here_lon: '126.963584',
                    next_lat: '47.476807',
                    next_lon: '136.963584'
                }, {
                    delivering_id: 2,
                    user_id: 21,
                    nickname: "트롬베",
                    here_lat: '38.476807',
                    here_lon: '126.963584',
                    next_lat: '48.476807',
                    next_lon: '136.963584'
                }, {
                    delivering_id: 3,
                    user_id: 12,
                    nickname: "파인슈메커",
                    here_lat: '39.476807',
                    here_lon: '126.963584',
                    next_lat: '49.476807',
                    next_lon: '136.963584'
                }, {
                    delivering_id: 4,
                    user_id: 9,
                    nickname: "앤디",
                    here_lat: '36.476807',
                    here_lon: '126.963584',
                    next_lat: '46.476807',
                    next_lon: '136.963584'
                }, {
                    delivering_id: 5,
                    user_id: 5,
                    nickname: "오마르",
                    here_lat: '35.476807',
                    here_lon: '126.963584',
                    next_lat: '45.476807',
                    next_lon: '136.963584'
                }, {
                    delivering_id: 6,
                    user_id: 41,
                    nickname: "MAXX",
                    here_lat: '34.476807',
                    here_lon: '126.963584',
                    next_lat: '44.476807',
                    next_lon: '136.963584'
                }, {
                    delivering_id: 7,
                    user_id: 88,
                    nickname: "스코박",
                    here_lat: '33.476807',
                    here_lon: '126.963584',
                    next_lat: '43.476807',
                    next_lon: '136.963584'
                }, {
                    delivering_id: 8,
                    user_id: 23,
                    nickname: "발렌시아",
                    here_lat: '32.476807',
                    here_lon: '126.963584',
                    next_lat: '42.476807',
                    next_lon: '136.963584'
                }]

            }
        });
    } else {
        res.send({
            error : '배달 가기의 목록을 불러올 수 없습니다.'
        });
    }
}); // 10. 배달 가기 목록 보기

router.get('/delivering/:delivering_id', isSecure, function(req, res, next) {
    var id = req.params.deliverer_id;
    res.send({
        result : {
            delivering_id : 33,
            user_id : 1,
            nickname : 'Chaos Theory',
            here_lat : '37.476807',
            here_lon : '126.963584',
            next_lat : '47.476807',
            next_lon : '136.963584',
            dep_time : '2016-08-24 18:01:00',
            arr_time : '2016-08-24 19:30:00'
        }
    });
}); // 11. ‘배달가기’ 상세 목록 보기

router.post('/delivering', isSecure, function(req, res, next) {
    var temp = {};
    temp.userId = req.body.user_id;
    temp.here = req.body.here;
    temp.next = req.body.next;
    temp.dep_time = req.body.dep_time;
    temp.arr_time = req.body.arr_time;
    res.send({
        result : {
            delivering_id : 11
        },
        temp : temp
    });

}); // 12. ‘배달 가기’ 등록

router.put('/', function(req, res, next) {
    var temp = {};
    temp.sending_id = req.body.sending_id;
    temp.delivering_id = req.body.delivering_id;
    temp.state = req.body.state;
    res.send({
        result : '계약이 체결 되었습니다.',
        temp : temp
    });
}); // 13. 계약 체결하기

router.get('/:contract_id', isSecure, function(req, res, next) {
    var contract_id = req.params.contract_id;
    res.send({
        result : {
            contract_id : contract_id,
            sending_id : 1,
            deliverer_id : 1,
            req_time : '2016-08-24 18:01:00',
            res_time : '2016-08-24 19:30:00',
            state : 2
        }
    });
}); // 14. 계약 내역 보기

router.put('/:contract_id', function(req, res, next) {
    var contract_id = req.params.contract_id;
    var state = req.body.state;
    res.send({
        result : '계약 상태가 변경되었습니다.',
        temp : {
            contract_id : contract_id,
            state : state
        }
    });
}); // 15. 배송 상태 변경하기

module.exports = router;