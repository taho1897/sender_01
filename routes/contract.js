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
        if (file.pic) {
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

router.get('/deliverings', isSecure, function(req, res, next) {
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
                    name: "젠가",
                    phone: '010-5252-2128',
                    star : 5.123,
                    here_lat: '37.476807',
                    here_lon: '126.963584',
                    next_lat: '37.475801',
                    next_lon: '126.963684',
                    originalFilename : '젠가.jpg',
                    fileUrl : ecTo + '/images/upload_d87be93afe6b958bc06b6ea66e08cb1d.jpg'
                    // 37.473280, 126.967847
                }, {
                    delivering_id: 2,
                    user_id: 21,
                    name: "트롬베",
                    phone: '010-5252-2128',
                    star : 5.123,
                    here_lat: '37.476358',
                    here_lon: '126.963475',
                    next_lat: '37.410257',
                    next_lon: '126.961427',
                    originalFilename : '트롬베.jpg',
                    fileUrl : ecTo + '/images/upload_ddbf77112816eb5009d8b58aabbcbdd9.jpg'
                }, {
                    delivering_id: 3,
                    user_id: 12,
                    name: "파인슈메커",
                    phone: '010-5252-2128',
                    star : 5.123,
                    here_lat: '37.480007',
                    here_lon: '126.963412',
                    next_lat: '37.500007',
                    next_lon: '126.912587',
                    originalFilename : '파인슈메커.jpg',
                    fileUrl : ecTo + '/images/upload_e3f936af3031701126cf8318fb804b26.jpeg'
                }, {
                    delivering_id: 4,
                    user_id: 9,
                    name: "앤디",
                    phone: '010-5252-2128',
                    star : 5.123,
                    here_lat: '37.476580',
                    here_lon: '126.958202',
                    next_lat: '37.423202',
                    next_lon: '126.962444',
                    originalFilename : '앤디.jpg',
                    fileUrl : ecTo + '/images/upload_e6acb29fd442b9988898de556d2adc01.jpg'
                }, {
                    delivering_id: 5,
                    user_id: 5,
                    name: "오마르",
                    phone: '010-5252-2128',
                    star : 5.123,
                    here_lat: '37.476580',
                    here_lon: '126.964240',
                    next_lat: '37.402444',
                    next_lon: '126.942584',
                    originalFilename : '오마르.jpg',
                    fileUrl : ecTo + '/images/upload_e98cfea2fdb0b14c739195e8daa75cb2.jpg'
                }, {
                    delivering_id: 6,
                    user_id: 41,
                    name: "MAXX",
                    phone: '010-5252-2128',
                    star : 5.123,
                    here_lat: '37.476107',
                    here_lon: '126.962084',
                    next_lat: '37.472807',
                    next_lon: '126.942584',
                    originalFilename : 'MAXX.jpg',
                    fileUrl : ecTo + '/images/upload_ee19916cc5a5e590343966a7c86d6de8.jpeg'
                }, {
                    delivering_id: 7,
                    user_id: 88,
                    name: "스코박",
                    phone: '010-5252-2128',
                    star : 5.123,
                    here_lat: '37.446807',
                    here_lon: '126.963884',
                    next_lat: '37.436807',
                    next_lon: '126.961584',
                    originalFilename : '스코박.jpg',
                    fileUrl : ecTo + '/images/upload_f0c8a44fe9a5156b316406193046bfd9.png'
                }, {
                    delivering_id: 8,
                    user_id: 23,
                    name: "발렌시아",
                    phone: '010-5252-2128',
                    star : 8.123,
                    here_lat: '37.476807',
                    here_lon: '126.943574',
                    next_lat: '37.4763017',
                    next_lon: '126.962544',
                    originalFilename : '발렌시아.jpg',
                    fileUrl : ecTo + '/images/upload_b8d932364f7deacaf1d713bb3e83c17c.jpg'
                }]
            }
        });
    } else {
        res.send({
            error : '배달 가기의 목록을 불러올 수 없습니다.'
        });
    }
}); // 11. 배달 가기 목록 보기

router.get('/deliverings/:delivering_id', isSecure, function(req, res, next) {
    var id = req.params.delivering_id;
    res.send({
        result : {
            delivering_id : 33,
            user_id : 1,
            name : 'Chaos Theory',
            here_lat : '37.476807',
            here_lon : '126.807584',
            next_lat : '37.476807',
            next_lon : '126.800584',
            dep_time : '2016-08-24 18:01:00',
            arr_time : '2016-08-24 19:30:00'
        }
    });
}); // 12. ‘배달가기’ 상세 목록 보기

router.post('/deliverings', isSecure, function(req, res, next) {
    var temp = {};
    temp.userId = req.body.user_id;
    temp.here = req.body.here;
    temp.next = req.body.next;
    temp.dep_time = req.body.dep_time;
    temp.arr_time = req.body.arr_time;
    res.send({
        result : {
            delivering_id : 11
        }
    });

}); // 13. ‘배달 가기’ 등록

router.put('/deliverings', function(req, res, next) {
    var temp = {};
    temp.contract_id = req.body.contract_id;
    temp.delivering_id = req.body.delivering_id;
    res.send({
        result : '배송 요청에 성공했습니다.'
    });
}); // 14. 계약 신청 하기

router.put('/', function(req, res, next) {
    var temp = {};
    temp.contract_id = parseInt(req.body.contract_id);
    temp.state = parseInt(req.body.state);
    if (temp.state !== 0) {
        return res.send({
            result: '계약이 체결되었습니다.'
        });
    }
    res.send({
        result: '계약이 거절되었습니다'
    });

}); // 15. 계약 체결하기

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
}); // 16. 계약 내역 보기

router.put('/:contract_id', function(req, res, next) {
    var contract_id = req.params.contract_id;
    var state = req.body.state;
    res.send({
        result : '계약 상태가 변경되었습니다.'
    });
}); // 15. 배송 상태 변경하기

module.exports = router;