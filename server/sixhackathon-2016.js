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
  });
