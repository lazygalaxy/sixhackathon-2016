Session.set('trend', '');
setTrend = function (newTrend) {
    Session.set('trend', newTrend);
}
getTrend = function () {
    return Session.get('trend');
}

getAllTrends = function () {
    var myArray = trends.find().fetch();
    var distinctArray = _.uniq(myArray, false, function (d) {
        return d.trend
    });
    return _.pluck(distinctArray, 'trend').sort();
}

getAllSymbols = function () {
    return ["WIKI/SWHC", "SPDJ/SPX", "YAHOO/INDEX_FCHI", "YAHOO/INDEX_SSMI", "YAHOO/INDEX_GDAXI", "YAHOO/INDEX_STOXX50E", "YAHOO/INDEX_N225", "YAHOO/MSCI", "YAHOO/INDEX_VIX", "YAHOO/HK_3033", "YAHOO/INDEX_HSI", "ODA/POILBRE_USD", "COINBASE/USD"].sort();
}

Session.set('symbol', '');
setSymbol = function (newSymbol) {
    console.log(newSymbol + " 1");
    Meteor.call('loadData', newSymbol, function () {
        console.log(newSymbol);
        Session.set('symbol', newSymbol);
    });
}
getSymbol = function () {
    return Session.get('symbol');
}

/*
$(function () {
      var data = {
          "US": 'hsla(0, 100%, 100%, 1)',
          "CN": 'hsla(0, 100%, 75%, 1)',
          "RU": 'hsla(0, 100%, 50%, 1)'
      };

      $('#world-map').vectorMap({
          map: 'world_mill_en',
          series: {
              regions: [{
                  values: data
              }]
          }
      });
  });
  */
