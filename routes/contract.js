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

}); // 9. 배송 요청 보기

router.get('/', function(req, res, next) {

}); // 10. 배달 가기 목록 보기

router.get('/', function(req, res, next) {

}); // 11. ‘배달가기’ 상세 목록 보기

router.post('/deliverering', function(req, res, next) {

}); // 12. ‘배달 가기’ 등록

router.put('/', function(req, res, next) {

}); // 13. 계약 체결하기

router.get('/:contract_id', function(req, res, next) {

}); // 14. 계약 내역 보기

router.put('/:contract_id', function(req, res, next) {

}); // 15. 배송 상태 변경하기

module.exports = router;