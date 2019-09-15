var f = require('../helper/functions');

var list = {
  showLowPriority: function(list, toggleItem) {
    f.toggleClass(list, 'list--show-all');

    setTimeout(function() {
      f.toggleClass(toggleItem, 'hidden');
    }, 150);
  },

  hideLowPriority: function(list, toggleItem) {
    f.toggleClass(toggleItem, 'hidden');

    setTimeout(function() {
      f.toggleClass(list, 'list--show-all');
    }, 300);
  }
};

module.exports = list;
