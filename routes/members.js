var express = require('express');
var router = express.Router();

router.put('/', function(req, res, next) {

}); // 2. 핸드폰 번호 등록

router.get('/me', function(req, res, next) {

}); // 3. 자신의 정보 보기

router.get('/:user_id', function(req, res, next) {

}); // 4. 특정 사용자의 정보 보기

router.put('/me', function(req, res, next) {

}); // 5. 자신의 프로필 사진 변경 하기

router.get('/logout', function(req, res, next) {

}); // 6. 로그아웃

router.delete('/', function(req, res, next) {

}); // 7. 회원 탈퇴 하기