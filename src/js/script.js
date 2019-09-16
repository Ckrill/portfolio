'use strict';

var f = require('./helper/functions');
var list = require('./modules/list');

// Document Load

window.onload = function() {
  // Show more / less

  f.addEventListener(f.select('.toggle-list-items'), 'click', function() {
    var listElement = f.select('.list'),
      toggleItem = f.select('.list__item--low-priority');

    if (!f.hasClass(listElement, 'list--show-all')) {
      list.showLowPriority(listElement, toggleItem);
    } else {
      list.hideLowPriority(listElement, toggleItem);
    }
  });

  // Show more / less - END
};

// Document Load - END
