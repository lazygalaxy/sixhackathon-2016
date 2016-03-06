//Template.hello.events({
//    'click button': function () {
//        // increment the counter when button is clicked
//        Session.set('counter', Session.get('counter') + 1);
//        initGlobalMap();
//    }
//});

Template.toolbar.helpers({
    getTrend: function () {
        return getTrend();
    },
    getSymbol: function () {
        return getSymbol();
    },
    getAllTrends: function () {
        return getAllTrends();
    }
});

Template.toolbar.events({
    "click .trend-dropdown li a": function (event) {
        setTrend(event.target.text);
    },
    "click .symbol-dropdown li a": function (event) {
        setSymbol(event.target.text);
    }
});

//initGlobalMap = function () {
//    console.log("hello");
//    $('#world-map-gdp').vectorMap({
//        map: 'world_mill_en',
//        series: {
//            regions: [{
//                values: gdpData,
//                scale: ['#C8EEFF', '#0071A4'],
//                normalizeFunction: 'polynomial'
//      }]
//        },
//        onRegionTipShow: function (e, el, code) {
//            el.html(el.html() + ' (GDP - ' + gdpData[code] + ')');
//        }
//    });
//}

Template.myTemplate.topGenresChart = function () {
    var theSymbol = getSymbol();
    var theTrend = getTrend();
    if (theSymbol && theTrend) {
        var minDate = instruments.findOne({
            symbol: theSymbol
        }, {
            sort: {
                date: 1
            }
        }).date;

        var trendMinDate = trends.findOne({
            trend: theTrend
        }, {
            sort: {
                date: 1
            }
        }).date;

        if (minDate < trendMinDate) {
            minDate = trendMinDate;
        }

        console.log("mindate: " + minDate);

        var theData = [];
        instruments.find({
            symbol: theSymbol,
            date: {
                $gte: minDate
            }
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
        trends.find({
            trend: theTrend,
            date: {
                $gte: minDate
            }
        }, {
            sort: {
                date: 1
            }
        }).forEach(function (line) {
            //console.log(line);
            var point = [Date.UTC(line.date.getFullYear(), line.date.getMonth(), line.date.getDate()), line.value];
            trendData.push(point);
        });

        return {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: theSymbol + ' vs Trend ' + theTrend
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: [{ // Primary yAxis
                title: {
                    text: 'Price'
                }
        }, {
                title: {
                    text: 'Trend'
                },
                min: 0,
                max: 100,
                opposite: true
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
                    name: theTrend,
                    data: trendData,
                    tooltip: {
                        valueDecimals: 2
                    }
            }
                ]
        };
    }
};
