const axios = require('axios');
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const originRequest = require("request");

// 爬虫电影天堂的数据
function request(url, callback) {
    const options = {
      url: url,
      encoding: null // 返回Buffer数据
    };
    originRequest(url, options, callback);
  }
for (let i = 100470; i < 100570; i++) {
    const url = `https://www.dy2018.com/i/${i}.html`;
    request(url, (err, res, body) => {
        const html = iconv.decode(body, "gb2312");
        const $ = cheerio.load(html);
        console.log($(".title_all h1").text(), i);
    })
  }

  // 爬虫豆瓣的数据 失败
for(let i=10763978;i<10763983;i++) {
    axios.get(`https://movie.douban.com/subject/${i}/`).then(res => {
        console.log(2) // 解析不出来
    }).catch(err => {
        console.log(1, i)
    })
} 


// 爬虫豆瓣的数据
for (let i = 10763978; i < 10763983; i++) {
    const url = `https://movie.douban.com/subject/${i}/`;
    request(url, (err, res, body) => {
        if(err) return
        const html = iconv.decode(body, "utf-8");
        const $ = cheerio.load(html);
        console.log($('#content h1').text());
    })
  }

