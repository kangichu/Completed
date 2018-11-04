
var express = require('express')
var router = express.Router();
var layout = require('express-layout');
var uni = require('unirest');
var _ = require('lodash');
var app = express();
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000

app.set('view engine', 'json')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res, callback) {

    var Request = uni.get('http://api-c1.hivisasa.com/const/locations/_list');
    Request.end(function(response, error) {
      if (error) {
          return callback(error);
      } else {
          var locations = response.body;
          console.log(locations);
          res.header("Content-Type",'application/json');
          app.set('json spaces', 40);
          res.json(locations);
          return callback(null, locations);
      };
        

        var Request = uni.get('http://analytics.hivisasa.tech/ranked');
        Request.end(function(response, error) {
            if (error) {
                return callback(error);
            } else {
                var rankedArticles = response.body;
                console.log(rankedArticles);
                res.header("Content-Type",'application/json');
                app.set('json spaces', 40);
                res.json(rankedArticles);
                return callback(null, rankedArticles);
            };
            

              var Request = uni.get('http://analytics.hivisasa.tech/latest');
              Request.end(function(response, error) {
                  if (error) {
                      return callback(error);
                  } else {
                      var latestArticles = response.body;
                      console.log(latestArticles);
                      res.header("Content-Type",'application/json');
                      app.set('json spaces', 40);
                      res.json(latestArticles);
                      return callback(null, latestArticles);
                  };

              });
        });
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`))


