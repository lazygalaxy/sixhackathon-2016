Meteor.startup(function () {
    if (!instruments.findOne({
            symbol: theSymbol
        })) {
        console.log("loading instruments");
        HTTP.get("https://www.quandl.com/api/v3/datasets/" + theSymbol + ".json?api_key=tH9A8D4yp3PfmZPkYMz9", {},
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    result.data.dataset.data.forEach(function (line) {
                        instruments.insert({
                            symbol: theSymbol,
                            date: new Date(line[0]),
                            price: line[thePriceIndex]
                        });
                    });
                }
            });
    }


    console.log("loading trend");

    var fileContents = Assets.getText('trends.csv');
    var fileContentsArray = fileContents.split(/\r?\n/);
    console.log(fileContentsArray.length);

    var line = fileContentsArray[0];
    var trendArray = line.split(',');
    for (var j = 1; j < trendArray.length; j++) {
        if (!trends.findOne({
                trend: trendArray[j]
            })) {
            for (var i = 1; i < fileContentsArray.length; i++) {

                var line = fileContentsArray[i];
                var values = line.split(',');
                //console.log(values);
                trends.insert({
                    trend: trendArray[j],
                    date: new Date(values[0].substring(0, 10)),
                    value: parseFloat(values[j])
                });
            }
        }
    }
});
