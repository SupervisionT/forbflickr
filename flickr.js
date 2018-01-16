$(function() {
  window.pagObj = $('#pagination').twbsPagination({
    totalPages: 35,
    visiblePages: 10,
    onPageClick: function(event, page) {
      var tags = $('.textInput').val()
      if (tags.length != 0)
      render(page, tags);
    }
  })
});

$('.btn').on('click', function() {
  $('#pagination').twbsPagination('show', 1);
})

$(document).keypress(function(e) {
  if (e.which == 13) {
    $('#pagination').twbsPagination('show', 1);
  }
});

function render(pageNo, tag) {
  $("img").remove();
  var ajaxSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=fde64ed7cc4357b0379522e6eb3bc647&tags=" +
      tag + "&page=" +
      pageNo + "&per_page=10&format=json&nojsoncallback=1",
    "method": "GET",
    "headers": {}
  }
  $.ajax(ajaxSettings).done(function(data) {
    $.each(data.photos.photo, function(i, gp) {
      var farmId = gp.farm,
        serverId = gp.server,
        id = gp.id,
        secret = gp.secret;
      $("#flickr").append('<img class=imgx src="https://farm' +
        farmId + '.staticflickr.com/' +
        serverId + '/' +
        id + '_' +
        secret + '.jpg"/>');
    });
    $('.imgx').on('click', function(e) {
      $(".overlay, .overlay-message").show();
      $('.overlay-message').css({
        backgroundImage: "url(" + e.target.src + ")",
        height: e.currentTarget.naturalHeight,
        width: e.currentTarget.naturalWidth,
        'background-size': '100%',
        'position': 'absolute',
        'left': '50%',
        'top': '50%',
        'margin-left': function() {
          return -$(this).outerWidth() / 2
        },
        'margin-top': function() {
          return -$(this).outerHeight() / 2
        }
      })
    })
    $(".overlay").click(function() {
      $(".overlay, .overlay-message").hide();
    });
  });
}
