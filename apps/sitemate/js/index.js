(function(el) {
  el = document.querySelector(el);
  
  var toggle = function() {
    el.classList.toggle('hidden'); // IE10+
  };
  
  var onClick = function(selector, target, cb) {
    var handler;
    var button = el.querySelector(selector);
    
    button.addEventListener('click', handler = function() {
      var html = document.createElement('div');
      html.innerHTML = 'You have clicked ' + this.innerHTML;
      target.insertAdjacentHTML('afterend', html.outerHTML);
      cb();
    });
    
    return function() {
      button.removeEventListener('click', handler);
    };
  };
  
  this.dialog = function(message, target) {
    var events;
    
    el.querySelector('.modal .message').innerHTML = message;
    
    var cleanup = function() {
      events.forEach(function(evt) { evt() }); // remove events
      toggle(); // hide
    };
    
    events = [
      onClick('.cancel', target, cleanup),
      onClick('.yes', target, cleanup)
    ];
    
    toggle(); // show
  };
})('#dialog');