// common.js
var QQMapWX = require('../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

function sayHello(name) {
  console.log(`Hello ${name} !`)
}

function sayGoodbye(name) {
  console.log('GoodBye ${name}')
}

function getPolylineArray(routes) {
  var routesArray = routes.map(function(item) {
    return {
      longitude: item.longitude,
      latitude: item.latitude,
    }
  })
  return routesArray
}

function getRoutesDescriptionArray(routes) {
  var routesDescriptionArray = routes.map(function(item) {
    return `${item.line} ${item.route[0].station} - ${item.route[item.route.length - 1].station} `;
  })
  return routesDescriptionArray;
}

function getMarkerArray(routes, block) {


  var markerArray = [];
  var num = 0;
  for (var i = 0; i < routes.length; i++) {

    if (routes[i].longitude === 'unknown' || routes[i].latitude === 'unknown') {

      console.log(`unknown location: ${routes[i].station}`)
      const locationMatched = routes[i].station.match(/(^.+)[\(（]/) ? routes[i].station.match(/(^.+)[\(（]/)[1] : routes[i].station
        // console.log(`中国,深圳,${locationMatched}`);
        //异步在线查找点


      searchGecocoder(`中国,深圳,${routes[i].station}`, function(res, i) {
        markerArray[i] = {
          longitude: res.result.location.lng,
          latitude: res.result.location.lat,
          name: routes[i].station,
          title: routes[i].station,
          // iconPath: '/image/bus_station.png',  //采用默认的图片
          alpha: 0.8, //透明度
          // width: 30,
          // height: 30,
        }
        num = num + 1;
        if (num === routes.length) {
          block(markerArray)
        }
      }, i);



    } else {

      markerArray[i] = {
        longitude: routes[i].longitude,
        latitude: routes[i].latitude,
        name: routes[i].station,
        title: routes[i].station,
        // iconPath: '/image/bus_station.png',  //采用默认的图片
        alpha: 0.8, //透明度
        // width: 30,
        // height: 30,
      }
      num = num + 1;
      if (num === routes.length) {
        block(markerArray)
      }
    }

    // var markersArray = routes.map(function(item) {

    //   if (item.longitude === 'unknown' || item.latitude === 'unknown') {
    //     console.log(`unknown location: ${item.station}`)
    //     const locationMatched = item.station.match(/(^.+)[\(（]/) ? item.station.match(/(^.+)[\(（]/)[1] : item.station
    //       // console.log(`中国,深圳,${locationMatched}`);
    //       //异步在线查找点
    //     searchGecocoder(`中国,深圳,${locationMatched}`, function(res) {
    //       return {
    //         longitude: res.result.location.lng,
    //         latitude: res.result.location.lat,
    //         name: item.station,
    //         title: item.station,
    //         iconPath: '/image/bus_station.png',
    //         alpha: 0.5, //透明度
    //         width: 30,
    //         height: 30,
    //       }
    //     });
    //   } else {
    //     return {
    //       longitude: item.longitude,
    //       latitude: item.latitude,
    //       name: item.station,
    //       title: item.station,
    //       iconPath: '/image/bus_station.png',
    //       alpha: 0.5, //透明度
    //       width: 30,
    //       height: 30,
    //     }
    //   }
    // })

  }


}

function searchGecocoder(name, block, num) {

  var tryNum = 1;
  // var isSuccess = false;
  var qqmapsdk = new QQMapWX({
    key: 'WLUBZ-TDF3S-2LSO2-6N6P2-JJ736-DTBJQ'
  });
  // 调用接口
  var handler = function() {
    qqmapsdk.geocoder({
      address: name,
      success: function(res) {
        block(res, num); //调用异步回调
        console.log(res);
      },
      fail: function(res) {
        setTimeout(function() {
          handler()
        }, tryNum * 500);
        // console.log(res);
      },
      complete: function(res) {

        console.log(res, num);
        // isSuccess = true;
      }
    });
  }

  setTimeout(function() {
    handler();
  }, 200);

}

module.exports.sayHello = sayHello
module.exports.sayGoodbye = sayGoodbye
module.exports.getPolylineArray = getPolylineArray
module.exports.getMarkerArray = getMarkerArray;
module.exports.searchGecocoder = searchGecocoder;
module.exports.getRoutesDescriptionArray = getRoutesDescriptionArray;