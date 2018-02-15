$(document).ready(function() {
  let latitud = localStorage.getItem('latitud');
  let longitud = localStorage.getItem('longitud');
  console.log(latitud);
  let proxy = 'https://cors-anywhere.herokuapp.com/';
  let apiLinkDS = `https://api.darksky.net/forecast/ef053d30e83f21037db223112b6728ed/${latitud},${longitud}?lang=es`;
  $.ajax({
    url: proxy + apiLinkDS,
    success: function(info) {
      console.log(info);
      var day = info.daily.data;
      day.forEach(element => {
        let tempMax = element.temperatureMax;
        let tempMin = element.temperatureMin;
        let icon = element.icon;
        let weekdays = new Array(7);
        weekdays[0] = 'Sunday';
        weekdays[1] = 'Monday';
        weekdays[2] = 'Tuesday';
        weekdays[3] = 'Wednesday';
        weekdays[4] = 'Thursday';
        weekdays[5] = 'Friday';
        weekdays[6] = 'Saturday';
        var currentDate = new Date(element.time * 1000);
        weekdayValue = currentDate.getDay();
        let output = `<div class='row valign-wrapper'><div class='col l2 col s2'><img class="responsive-img" src="../assets/images/png/${icon}.png"></div><div class='col l4 col s4'><span>${weekdays[weekdayValue]}</span></div><div class='col l6 col s6 right-align'><span>${((tempMin - 32) * 5 / 9).toFixed(2)}° - ${((tempMax - 32) * 5 / 9).toFixed(2)}°</span></div></div>`;
        $('.container').append(output);
        $('#return').on('click', function() {
          window.location.href = 'index.html';
        });
      });
    }
  });
  let apiurl, myresult, apiurlSize, selectedSize;
  apiurl = 'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=1cf0028debc4facaa34a8aedf509babf&gallery_id=72157692666047334&per_page=10&format=json&nojsoncallback=1';
  $.getJSON(apiurl, function(json) {
    $.each(json.photos.photo, function(i, myresult) {
      apiurlSize = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=1cf0028debc4facaa34a8aedf509babf&photo_id=' + myresult.id + '&format=json&nojsoncallback=1';
      $.getJSON(apiurlSize, function(size) {
        $.each(size.sizes.size, function(i, myresultSize) {
          if (myresultSize.label == 'Large') {
            console.log(myresultSize.source);
            $('.body').css('background', 'linear-gradient(rgba(0,0,0, .5), rgba(0,0,0,.5)), url(' + myresultSize.source + ') no-repeat center center');
          }
        });
      });
    });
  });
});