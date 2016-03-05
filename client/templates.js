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
    var chart_data = instruments.find({});
    console.log(chart_data);

    return {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'AAPL Stock Price'
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
            name: 'AAPL',
            data: Session.get('thedata'),
            tooltip: {
                valueDecimals: 2
            }
            }]
    };
};
