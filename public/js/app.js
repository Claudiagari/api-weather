function initGoogleAPI() {
  let autocomplete = new google.maps.places.SearchBox(document.querySelector('#city-search'));
  document.getElementById('search').addEventListener('click', function() {
    let place = autocomplete.getPlaces()[0];
    let latitud = place.geometry.location.lat();
    let longitud = place.geometry.location.lng();
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let apiLinkDS = `https://api.darksky.net/forecast/ef053d30e83f21037db223112b6728ed/${latitud},${longitud}?lang=es`;
    $.ajax({
      url: proxy + apiLinkDS,
      success: function(data) {
        console.log(data);
        $('#city').text($('#city-search').val());
        $('#icon').attr('src', '../assets/images/png/' + data.currently.icon + '.png');
        $('#temperature').text(`${((data.currently.temperature - 32) * 5 / 9).toFixed(2)}`);
        $('#wind').text(`${data.currently.windSpeed} m/s`);
        $('#humidity').text(`${(data.currently.humidity) * 100} %`);
        $('#pressure').text(`${data.currently.pressure} hPa`);
        $('#city-search').val('');
        $('#prediction').on('click', function() {
          localStorage.latitud = latitud;
          localStorage.longitud = longitud;
          window.location.href = 'views/prediction.html';
        });
      }
    });
  });
}
let apiurl, myresult, apiurlSize, selectedSize;
apiurl = 'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=1cf0028debc4facaa34a8aedf509babf&gallery_id=72157692666047334&per_page=10&format=json&nojsoncallback=1';

$.getJSON(apiurl, function(json) {
  $.each(json.photos.photo, function(i, myresult) {
    apiurlSize = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=1cf0028debc4facaa34a8aedf509babf&photo_id=' + myresult.id + '&format=json&nojsoncallback=1';
    $.getJSON(apiurlSize, function(size) {
      $.each(size.sizes.size, function(i, myresultSize) {
        if (myresultSize.label == 'Large') {
          console.log(myresultSize.source);
          $('.body').css('background-image', 'url(' + myresultSize.source + ') no-repeat center center');
        }
      });
    });
  });
});


