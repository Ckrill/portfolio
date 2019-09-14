var isCollection = function(el) {
    if (el === undefined) return false;

    var protoName = el.toString();

    return (
      protoName.indexOf('HTMLCollection') != -1 ||
      protoName.indexOf('NodeList') != -1 ||
      Array.isArray(el)
    );
  },
  callEach = function(el, callback) {
    if (isCollection(el)) {
      functions.forEach(el, callback);
    } else {
      callback(el);
    }
  };

// Functions

var functions = {
  addEventListener: function(el, eventNames, callback, parent) {
    if (parent) {
      callEach(parent, function(e) {
        eventNames.split(' ').forEach(function(eventName) {
          e.addEventListener(eventName, callback);
        });
      });
    } else {
      callEach(el, function(e) {
        eventNames.split(' ').forEach(function(eventName) {
          e.addEventListener(eventName, callback);
        });
      });
    }
  },

  forEach: function(elements, callback) {
    Array.prototype.forEach.call(elements, callback);
  },

  hasClass: function(el, className) {
    if (isCollection(el)) {
      el = el[0];
    }

    return el.classList.contains(className);
  },

  select: function(selector, parent) {
    if (isCollection(parent)) {
      parent = parent[0];
    }

    if (!parent) {
      parent = document;
    }

    if (selector.indexOf(' ') === -1 && selector.indexOf(':') === -1) {
      if (selector.lastIndexOf('.') === 0) {
        return parent.getElementsByClassName(selector.substring(1));
      }

      if (selector.lastIndexOf('#') === 0) {
        return parent.getElementById(selector.substring(1));
      }
    }

    return parent.querySelectorAll(selector);
  },

  toggleClass: function(el, className) {
    callEach(el, function(e) {
      e.classList.toggle(className);
    });
  }
};

module.exports = functions;
