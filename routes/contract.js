var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var result = {};
    result.user_id = req.body.user_id;
   result.addr = req.body.addr;
    result.rec_phone = req.body.rec_phone;
    result.price = req.body.price;
    result.info = req.body.info || "";
    result.pic = req.body.pic || "";
    result.memo = req.body.memo || "";

    res.send({
       message :  '배송 요청이 등록되었습니다.',
       temp : result
    });
}); // 8. 배송 요청 등록 및 미체결 계약 생성

router.get('/', function(req, res, next) {
    var sender = req.query.sender;
    var currentPage = req.query.CurrentPage || 1;
    var itemsPerPage = req.query.itemsPerPage || 10;
    if(sender !== undefined) {
        res.send({
            result: {
                sender_id: sender,
                addr : '서울 관악구 서울대 연구공원',
                info : '도자기',
                pic : 'http://localhost:3000/images/upload_01bd18c7dd4fa45013be85aef81111111.jpg',
                arr_time : '2016-08-24 11:24:32',
                req_phone : '010-1235-5555',
                price: 12000,
                memo: '깨지기 쉬워요!!'
            }
        });
    } else if (sender === undefined) {
        res.send({
            totalPage : 10,
            currentPage : currentPage,
            itemPerPage : itemsPerPage,
            result : {
                deliverer : [{
                    deliverer_id : 1,
                    user_id : 1,
                    here : '서울 서초구 강남대로 399 한국몬테소리 빌딩',
                    next : '서울 관악구 서울대 연구공원 웨딩홀 식당'
                },{
                    deliverer_id : 2,
                    user_id : 21,
                    here : '서울 서초구 서초대로 314 서브웨이',
                    next : '서울 관악구 남현1길 51 연안본가'
                },{
                    deliverer_id : 3,
                    user_id : 12,
                    here : '서울 서초구 강남대로61길 13 버터핑거팬케이크',
                    next : '서울 관악구 과천대로 947 사당타워 나동 1층 봉추찜닭'
                },{
                    deliverer_id : 4,
                    user_id :9,
                    here : '서울 관악구 남현1길 58 설악흑돼지마을',
                    next : '서울 관악구 서울대 연구공원 웨딩홀 식당'
                },{
                    deliverer_id : 5,
                    user_id : 5,
                    here : '서울 관악구 남현3길 78 만경양육관',
                    next : '서울 관악구 과천대로 947 사당타워 나동 1층 크리스피크림도넛'
                },{
                    deliverer_id : 6,
                    user_id : 41,
                    here : '서울 서초구 강남대로61길 13 버터핑거팬케이크',
                    next : '서울 관악구 서울대 연구공원 웨딩홀 식당'
                },{
                    deliverer_id : 7,
                    user_id : 88,
                    here : '서울 관악구 과천대로 939 르메이에르강남타운 3층 빕스',
                    next : '서울 관악구 과천대로 947 사당타워 나동 1층 크리스피크림도넛'
                },{
                    deliverer_id : 8,
                    user_id : 23,
                    here : '서울 관악구 과천대로 939 르메이에르강남타운 1층 피자헛',
                    next : '서울 관악구 서울대 연구공원 웨딩홀 식당'
                }]
            }
        });
    }
}); // 9. 배송 요청 보기 & 10. 배달 가기 목록 보기

router.get('/:deliverer_id', function(req, res, next) {
    var id = req.params.deliverer_id;
    res.send({
       result : {
           deliverer : {
               user_id : 1,
               here : '서울 서초구 강남대로 399 한국몬테소리 빌딩',
               next : '서울 관악구 서울대 연구공원 웨딩홀 식당',
               dep_time : '2016-08-24 18:01:00',
               arr_time : '2016-08-24 17:30:00'
           }
       }
    });
}); // 11. ‘배달가기’ 상세 목록 보기

router.post('/deliverering', function(req, res, next) {
    var userId = req.body.user_id;
    var here = req.body.user_id;
    var next = req.body.next;
    var dep_time = req.body.dep_time;
    var arr_time = req.body.arr_time;

    res.send({
        message : '배달 가기 정보를 등록했습니다.'
    });

}); // 12. ‘배달 가기’ 등록

router.put('/', function(req, res, next) {

}); // 13. 계약 체결하기

router.get('/:contract_id', function(req, res, next) {

}); // 14. 계약 내역 보기

router.put('/:contract_id', function(req, res, next) {

}); // 15. 배송 상태 변경하기

module.exports = router;