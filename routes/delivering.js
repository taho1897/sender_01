var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var url = require('url');
var isSecure = require('./common').isSecure;
var isAuthenticated = require('./common').isAuthenticated;
var ecTo = 'http://ec2-52-78-70-38.ap-northeast-2.compute.amazonaws.com';
var ecToS = 'https://ec2-52-78-70-38.ap-northeast-2.compute.amazonaws.com';

router.get('/', isSecure, function(req, res, next) {
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

router.get('/:delivering_id', isSecure, function(req, res, next) {
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

router.post('/', isSecure, function(req, res, next) {
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
