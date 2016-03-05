Meteor.methods({
    'loadData': function (theSymbol) {
        if (!instruments.findOne({
                symbol: theSymbol
            })) {
            console.log("loading instrument " + theSymbol);
            var thePriceIndex = 3;
            if (theSymbol.startsWith("WIKI")) {
                thePriceIndex = 11;
            }
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
    }
});

Meteor.startup(function () {
    for (var i = 1; i < 100; i++) {
        try {
            var fileContents = Assets.getText('trends' + i + '.csv');
        } catch (err) {
            break;
        }
        var fileContentsArray = fileContents.split(/\r?\n/);

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
                console.log("loading " + fileContentsArray.length + " " + trendArray[j]);
            }
        }
    }
});
