

function getLollyData(id) {

  var url = `/.netlify/functions/getLolly?id=${id}`;
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    if(json.requestResult.statusCode && json.requestResult.statusCode == 404) {
      window.location.pathname = "/melted";
    } else {
      displayLolly(json);
    }
  });
}


function displayLolly(data) {

  var params = new URLSearchParams(location.search);
  if(params.has('new')){
    $('#status').innerHTML = `Lolly is frozen and ready for you to share with your friend: <code>https://vlolly.net/lolly/${data.lollyPath}</code>`;
  } else {
    $('#status').innerText = "A lolly for you. Aren't you lucky!";
  }
  $('#recipient').innerText = data.recipientName;
  $('#message').innerText = data.message;
  $('.lollyTop').style.fill = data.flavourTop;
  $('.lollyMiddle').style.fill = data.flavourMiddle;
  $('.lollyBottom').style.fill = data.flavourBottom;
  $('#from').innerText = data.sendersName;
}


(function(){

  // If we find a d
  var params = new URLSearchParams(location.search);
  if(params.has('id')){
    getLollyData(params.get('id'));
  }

})();
