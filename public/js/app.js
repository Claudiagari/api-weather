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
        $('#temperature').text(`${data.currently.temperature}`);
        $('#wind').text(`${data.currently.windSpeed} m/s`);
        $('#humidity').text(`${(data.currently.humidity) * 100} %`);
        $('#pressure').text(`${data.currently.pressure} hPa`);
        $('#city-search').val('');
      }
    });
  });
}
