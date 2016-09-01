var express = require('express');
var router = express.Router();
// var isAuthenticated = require('./common').isAuthenticated;
var ecTo = 'http://ec2-52-78-70-38.ap-northeast-2.compute.amazonaws.com:80';

router.get('/', function(req, res, next) {
    var currentPage = parseInt(req.query.currentPage);
    var itemsPerPage = parseInt(req.query.itemsPerPage);
    var type = parseInt(req.query.type);
    if (req.url.match(/\/\?currentPage=\d+&itemsPerPage=\d+&type=\d+/i)) {
        if (type === 0) {
            res.send({
                result:{
                    totalpage : 10,
                    correntPage : currentPage,
                    itemsPerPage : itemsPerPage,
                    data : [{
                        notice_id : 1,
                        type : 0,
                        title : '오픈!',
                        content : 'sender가 시작합니다!',
                        write_date : '2016-09-23 00:00:00'},{
                        notice_id : 2,
                        type : 0,
                        title : '두번째 공지 사항!',
                        content : 'sender가 업데이트 됩니다!',
                        write_date : '2016-10-23 00:00:00'}]
                }
            });
        } else if (type === 1) {
            res.send({
                result: {
                    totalpage: 10,
                    correntPage: currentPage,
                    itemsPerPage: itemsPerPage,
                    data: [{
                        notice_id: 3,
                        type: 1,
                        title: '오픈기녕 이벤트!',
                        content: '2주동안 배송비를 sender가 지원합니다!',
                        write_date: '2016-09-23 00:00:00'
                    }, {
                        notice_id: 4,
                        type: 1,
                        title: '업데이트 기념 이벤트!',
                        content: 'SENDER가 여러분께 한걸음 가까이 다가가고자 이벤트를 진행합니다. ' +
                            '이벤트에 참여하셔서 좋은 혜택 많이 많이 받아가세요.' +
                            '<참여방법>' +
                            '1. SENDER로서 요청하고 매칭 5회' +
                            '2. DELIVERER로서 매칭해서 배송완료까지 5회' +
                            '<이벤트 일정>' +
                            '1. 기간 : 2016년 8월 29일(월) - 2016년 9월 30(금)' +
                            '2. 경품 : KFC 핫크리스피치킨 1박스 (5명), 던킨 아메리카노 R (20명)' +
                            '3. 선정방법 : 선착순' +
                            '4. 당첨 발표 : 2016년 10월 9일 (일)' +
                            '<당첨 TIP!>' +
                            '1. 참여 미션 2개를 모두 수행' +
                            '2. SENDER를 자주 자주 이용할 것!',
                        originalFilename : 'event_01.jpg',
                        fileUrl : ecTo + '/images/event_01.png',
                        write_date: '2016-10-23 00:00:00'
                    }]
                }
            });
        } else {
            res.send({
               error : '공지 목록을 가져오지 못했습니다'
            });
        }
    }
});

module.exports = router;