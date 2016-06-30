var express = require('express');
var app = express();
var superagent = require('superagent')
var cheerio = require('cheerio');

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});


var allUrl = 'https://segmentfault.com/questions?page=';
app.get('/', function(req, res) {
	var page = req.query.page;
	superagent.get(allUrl + page)
		.end(function(err, sres) {
			var arrInfo = getList(sres.text);
			res.jsonp(arrInfo);
		});

});
app.get('/tag', function(req, res) {
	var page = req.query.page;
	var tag = req.query.tag;
	console.log(tag);
	var t = 'https://segmentfault.com/t/' + tag + '?type=newest&page=' + page;
	superagent.get(t)
		.end(function(err, sres) {
			var arrInfo = getList(sres.text);
			console.log(arrInfo);
			res.jsonp(arrInfo);
		});

});
var questionUrl = 'https://segmentfault.com/q/';
app.get('/question', function(req, res) {
	var id = req.query.id;
	var qUrl = questionUrl + id;
	superagent.get(qUrl)
		.end(function(err, sres) {
			var $ = cheerio.load(sres.text, {
				decodeEntities: false
			});
			$("img[data-src]").each(function() {
				var src = $(this).attr('data-src');
				$(this).attr('src', "https://segmentfault.com" + src);
			});

			var arr = {
				question: [],
				comment: []
			};
			arr.question = {
				title: $("#questionTitle").find('a').text(),
				question: $(".question").html(),
				count: $(".widget-question__item").find('.count').text(),
				authorTime: $(".question__author").text()
			}
			var commonts = $(".widget-answers__item");
			commonts.map(function(index, item) {
				var $ele = $(item);
				arr.comment.push({
					answer: $ele.find('.answer ').html(),
					count: $ele.find('.widget-vote .count ').text(),
					avatar: $ele.find(".avatar-32").attr("src"),
					name: $ele.find('.answer__info--author-name').text(),
					rank: $ele.find(".answer__info--author-rank").text(),
					time: $ele.find(".mb0 a").eq(0).text()
				});
			});
			res.jsonp(arr);
		});

});

function getList(data) {
	var $ = cheerio.load(data);
	var arr = [];
	var list = $('.stream-list').find('section');
	list.map(function(index, item) {
		var $ele = $(item),
			reg = /\d+/;
		var views = parseInt($ele.find('.views').text().trim());
		var answers = parseInt($ele.find('.answers').text().trim());
		var votes = parseInt($ele.find('.votes').text().trim());
		var author = $ele.find(".author a").eq(0).text();
		var title = $ele.find('.title a').text().trim();
		var titleSrc = $ele.find('.title a').attr("href").match(reg).toString();
		var collect = parseInt($ele.find('.pull-right').text().trim());
		var time = $ele.find(".author a").eq(1).text();;

		arr.push({
			views: views,
			answers: answers,
			votes: votes,
			title: {
				content: title,
				titleSrc: titleSrc
			},
			collect: collect,
			author: author,
			time: time
		});
		// console.log(author);
	});
	return arr;
}
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('server listening 3000');
})