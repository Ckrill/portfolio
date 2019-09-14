var f = require('./functions');

function listShowLowPriority(list, toggleItem) {
  f.toggleClass(list, 'list--show-all');

  setTimeout(function() {
    f.toggleClass(toggleItem, 'hidden');
  }, 150);
}

function listHideLowPriority(list, toggleItem) {
  f.toggleClass(toggleItem, 'hidden');

  setTimeout(function() {
    f.toggleClass(list, 'list--show-all');
  }, 300);
}

// Document Load

window.onload = function() {
  // Show more / less

  f.addEventListener(f.select('.toggle-list-items'), 'click', function() {
    var list = f.select('.list'),
      toggleItem = f.select('.list__item--low-priority');

    if (!f.hasClass(list, 'list--show-all')) {
      listShowLowPriority(list, toggleItem);
    } else {
      listHideLowPriority(list, toggleItem);
    }
  });

  // Show more / less - END
};

// Document Load - END
