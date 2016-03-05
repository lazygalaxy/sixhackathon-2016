// counter starts at 0
Session.setDefault('counter', 0);

Template.hello.helpers({
    counter: function () {
        return Session.get('counter');
    }
});

Template.hello.events({
    'click button': function () {
        // increment the counter when button is clicked
        Session.set('counter', Session.get('counter') + 1);
        initGlobalMap();
    }
});


initGlobalMap = function () {
    console.log("hello");
    $('#world-map-gdp').vectorMap({
        map: 'world_mill_en',
        series: {
            regions: [{
                values: gdpData,
                scale: ['#C8EEFF', '#0071A4'],
                normalizeFunction: 'polynomial'
      }]
        },
        onRegionTipShow: function (e, el, code) {
            el.html(el.html() + ' (GDP - ' + gdpData[code] + ')');
        }
    });
}

Template.myTemplate.topGenresChart = function () {
    var theData = [];
    instruments.find({
        symbol: theSymbol
    }, {
        sort: {
            date: 1
        }
    }).forEach(function (line) {
        var point = [line.date, line.price];
        theData.push(point);
        //console.log(line.date);
    });

    var trendData = [];
    trends.find({}, {
        sort: {
            date: 1
        }
    }).forEach(function (line) {
        if (line.trend == "trump") {
            //console.log(line);
            var point = [Date.UTC(line.date.getFullYear(), line.date.getMonth(), line.date.getDate()), line.value];
            trendData.push(point);

        }
    });

    return {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: theSymbol + ' vs Trend'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: [{ // Primary yAxis
            title: {
                text: 'Price'
            },
            opposite: true
        }, {
            title: {
                text: 'Trend'
            }
        }],
        legend: {
            enabled: false
        },
        series: [
            {
                type: 'line',
                yAxis: 0,
                name: 'SPX',
                data: theData,
                tooltip: {
                    valueDecimals: 2
                }
            }
            ,
            {
                type: 'line',
                yAxis: 1,
                name: 'Trump',
                data: trendData,
                tooltip: {
                    valueDecimals: 2
                }
            }
                ]
    };
};
