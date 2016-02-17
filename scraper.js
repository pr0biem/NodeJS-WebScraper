var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var website = 'http://substack.net/images/'

request(website, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    var stream = fs.createWriteStream('content.csv');
    stream.once('open', function(fd) {

      var $ = cheerio.load(body)

      $('tr').each(function(i, el) {
        var permission = $(el).find('code').first().text();
        var urls = website + $(el).find('a').text();
        var file = urls.split('.').pop();
        if (/.+\/$/.test(file)) {
          file = 'folder'
        };
        stream.write(permission + ',' + urls + ',' + file + '\n');
      });
      stream.end();
    });
  };
});