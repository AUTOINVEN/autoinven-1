var firstSize_x = 150;
  var firstSize_y = 150;

  window.onload = function () {
    t_zoom.style.background = 'url(/Image/main_home.jpg) 50% 50% /' + firstSize_x + '% ' + firstSize_y +
      '% no-repeat';
  };

  var t_zoom = document.getElementById('mainhead');
  window.addEventListener('scroll', zoomImg);

  function zoomImg() {
    var h_window = window.innerHeight;
    var h_body = document.body.scrollHeight;
    var h_end = 1500; //크기변화 끝낼위치 설정

    //h_end값 잘못넣으면 그냥 맨 마지막 스크롤까지 효과 나오도록
    if (h_end > h_body || h_end < h_window) {
      var size_x = firstSize_x - Math.floor((firstSize_x - 100) / (h_body - h_window) * window.scrollY);
      var size_y = firstSize_y - Math.floor((firstSize_y - 100) / (h_body - h_window) * window.scrollY);
    } else if (window.scrollY <= h_end - h_window) {
      var size_x = firstSize_x - Math.floor((firstSize_x - 100) / (h_end - h_window) * window.scrollY);
      var size_y = firstSize_y - Math.floor((firstSize_y - 100) / (h_end - h_window) * window.scrollY);
    }

    console.log(size_x + " " + size_y + " " + window.scrollY);
    t_zoom.style.background = 'url(../Image/main_home.jpg) 50% 50% /' + --size_x + '% ' + --size_y + '% no-repeat';
  }



var map;
var i = 0;
var markers = [];
var today = new Date();
today.setHours(0, 0, 0, 0);

function initMap() {
    var daegu = {lat: 35.87222, lng: 128.60250};
    var items = JSON.parse(document.getElementById("items").innerText);
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 12,
            center: daegu
        });
    for (key in items) {
        markers[i] = new google.maps.Marker({
            position: {lat: items[key].latitude, lng: items[key].longitude},
            map: map,
        });
        markers[i].addListener('click', function () {
            var k = 'item' + markers.indexOf(this);
            map.setCenter(this.getPosition());
            $("#whName").html(items[k]['warehouseName']);
            $("#whAddress").html(items[k]['address']);
            $("#whLandArea").html(items[k]['landArea'] + " m<sup>2</sup>");
        });
        i++;
    }
}
