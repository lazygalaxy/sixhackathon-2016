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
    }
});

Template.myTemplate.topGenresChart = function () {
    var theData = [];
    instruments.find({}).forEach(function (line) {
        var point = [line.date, line.price];
        theData.push(point);
    });

    //    var trendData = [];
    //    trends.find({
    //        "trend": {
    //            "$ne": 'trump'
    //        }
    //    }).forEach(function (line) {
    //        var point = [line.date, line.value];
    //        trendData.push(point);
    //    });

    return {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'SPX Price'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Price'
            }
        },
        legend: {
            enabled: false
        },
        series: [{
                type: 'line',
                name: 'SPX',
                data: theData,
                tooltip: {
                    valueDecimals: 2
                }
            }
//                 , {
//            type: 'line',
//            name: 'Trump',
//            data: trendData,
//            tooltip: {
//                valueDecimals: 2
//            }
//        }
                ]
    };
};
