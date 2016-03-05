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
    var trendData = [];
    trends.find({}, {
        sort: {
            date: 1
        }
    }).forEach(function (line) {
        if (line.trend == "trump") {
            //console.log(line);
            var point = [new Date(line.date), line.value];
            trendData.push(point);
            console.log(line.date);
        }
    });

    var theData = [];
    instruments.find({}, {
        sort: {
            date: 1
        }
    }).forEach(function (line) {
        var point = [line.date, line.price];
        theData.push(point);
        //console.log(line.date);
    });

    var theData2 = [];
    instruments.find({}, {
        sort: {
            date: 1
        }
    }).forEach(function (line) {
        var point = [line.date, line.price * 0.2];
        theData2.push(point);
        //console.log(line.date);
    });

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
        series: [
            {
                type: 'line',
                name: 'SPX',
                data: theData,
                tooltip: {
                    valueDecimals: 2
                }
            }
            ,
            {
                type: 'line',
                name: 'Trump',
                data: trendData,
                tooltip: {
                    valueDecimals: 2
                }
            }
                ]
    };
};
