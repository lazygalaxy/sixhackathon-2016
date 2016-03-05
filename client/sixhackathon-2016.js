Session.set('trend', 'isis');
setTrend = function (newTrend) {
    Session.set('trend', newTrend);
}
getTrend = function () {
    return Session.get('trend');
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
