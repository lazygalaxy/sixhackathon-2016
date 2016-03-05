  Meteor.startup(function () {
      if (!instruments.findOne()) {
          console.log("loading instruments");
          HTTP.get("https://www.quandl.com/api/v3/datasets/SPDJ/SPX.json", {},
              function (err, result) {
                  if (err) {
                      console.log(err);
                  } else {
                      result.data.dataset.data.forEach(function (line) {
                          instruments.insert({
                              symbol: 'SPX',
                              date: new Date(line[0]),
                              tr: line[1],
                              net_tr: line[2],
                              price: line[3]
                          });
                      });
                  }
              });
      }

      if (!trends.findOne()) {
          console.log("loading trends");

          var fileContents = Assets.getText('trends.csv');
          var fileContentsArray = fileContents.split(/\r?\n/);
          console.log(fileContentsArray.length);

          var trendArray = [];
          for (var i = 0; i < fileContentsArray.length; i++) {
              var line = fileContentsArray[i];
              if (trendArray.length > 0) {
                  if (line.length == 0) {
                      break;
                  }
                  var values = line.split(',');
                  console.log(values);

                  for (var j = 1; j < trendArray.length; j++) {
                      trends.insert({
                          trend: trendArray[j],
                          date: new Date(values[0].substring(0, 10)),
                          value: values[j]
                      });
                  }
              }

              if (line.startsWith("Week")) {
                  trendArray = line.split(',');
                  console.log(trendArray);
              }
          }
      }
  });
