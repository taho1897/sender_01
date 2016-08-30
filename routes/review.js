var express = require('express');
var router = express.Router();
// var isAuthenticated = require('./common').isAuthenticated;

router.post('/', function(req, res, next) {
    var userId = req.body.user_id;
    var contractId = req.body.contract_id;
    var content = req.body.content;
    var star = req.body.star;

    res.send({
        result: '리뷰 등록에 성공했습니다.',
        temp: {
            user_id: userId,
            contract_id: contractId,
            content: content,
            star: star
        }
    });
});

router.get('/', function(req, res, next) {
    if (req.url.match(/\/\?currentPage=\d+&itemsPerPage=\d+&deliverer_id=\d+/i)) { // 주문 목록 조회 req.url: /?pageNo=1&rowCount=10

        var currentPage = parseInt(req.query.currentPage, 10) || 1;
        var itemsPerPage = parseInt(req.query.itemsPerPage, 10) || 10;
        var delivererId = parseInt(req.query.deliverer_id, 10);

        res.send({
            result: {
                totalPage: 10,
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,//rowCount
                data: {
                    user_id: delivererId,
                    review: [{
                        reviewer_id: "Whizzard",
                        content: "물건을 너무 막 다루셔서 좌절감이 듭니다",
                        star: 3,
                        date: "2016-08-11 17:05:25"
                    },
                        {
                            reviewer_id: "Scovac",
                            content: "깨지기 쉬운 물건인데 너무 막 다루시네요",
                            star: 1,
                            date: "2016-08-13 17:05:25"
                        },
                        {
                            reviewer_id: "Armand",
                            content: "채팅을 너무 성의 없게 한다",
                            star: 4,
                            date: "2016-08-11 17:05:25"
                        }]
                }
            }
        });
    } else {
        res.send({
           error : '리뷰 목록 불러오기를 실패했습니다.'
        });
    }
});


module.exports = router;