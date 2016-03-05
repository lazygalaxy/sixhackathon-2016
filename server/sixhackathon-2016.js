  Meteor.startup(function () {
      if (!instruments.findOne()) {
          console.log("loading instruments");
          HTTP.get("https://www.quandl.com/api/v3/datasets/SPDJ/SPX.json", {},
              function (err, result) {
                  if (err) {
                      console.log(err);
                  } else {
                      console.log(result.data.dataset.data);
                      result.data.dataset.data.forEach(function (line) {
                          instruments.insert({
                              symbol: 'SPX',
                              tr: line[0],
                              net_tr: line[1],
                              price: line[2]
                          });
                      });
                  }
              });
      }
  });
