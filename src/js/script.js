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

  console.info(
    '%cThis was built with a focus on performance. I know what you are thinking... go ahead... test it.' +
      '\nDid I miss something? Tell me about it 🤙🏾',

    'display: block;' +
      'padding: 10px 18px;' +
      'border: 1px solid rgba(0, 0, 0, 0.1);' +
      'background-color: #f5f5f5;' +
      'font-size: 14px;' +
      'font-weight: 300;' +
      'line-height: 26px;' +
      'text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);' +
      'color: #424242;'
  );
};

// Document Load - END
