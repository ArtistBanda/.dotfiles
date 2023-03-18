var port = chrome.extension.connect();
port.postMessage({action: 'start'});

var slide = document.getElementById('slide');

port.postMessage({action: 'give value'});
port.onMessage.addListener(function(msg) {
  slide.value = parseInt(msg);
});


slide.onchange = function() {
    port.postMessage({action: this.value});
}

button.onclick = function() {
  port.postMessage({faction: true});
  window.close();
}

//port.onMessage.addListener(function(msg) {
//  var dataArray = msg.data;
// var bufferLength = msg.bufferLength;

//});


