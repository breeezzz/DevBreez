/**
** Name: [BreezDev] - Login Application - Validation javascript
** Description: Makes sure users follow the set parameters
**/

var addDOMLoadEvent = (function(){
    // create event function stack
    var load_events = [],
        load_timer,
        script,
        done,
        exec,
        old_onload,
        init = function () {
            done = true;

            // kill the timer
            clearInterval(load_timer);

            // execute each function in the stack in the order they were added
            while (exec = load_events.shift())
                exec();

            if (script) script.onreadystatechange = '';
        };

    return function (func) {
        // if the init function was already ran, just run this function now and stop
        if (done) return func();

        if (!load_events[0]) {
            // for Mozilla/Opera9
            if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", init, false);

            // for Internet Explorer
            /*@cc_on @*/
            /*@if (@_win32)
                document.write("<script id=__ie_onload defer src=//0><\/scr"+"ipt>");
                script = document.getElementById("__ie_onload");
                script.onreadystatechange = function() {
                    if (this.readyState == "complete")
                        init(); // call the onload handler
                };
            /*@end @*/

            // for Safari
            if (/WebKit/i.test(navigator.userAgent)) { // sniff
                load_timer = setInterval(function() {
                    if (/loaded|complete/.test(document.readyState))
                        init(); // call the onload handler
                }, 10);
            }

            // for other browsers set the window.onload, but also execute the old window.onload
            old_onload = window.onload;
            window.onload = function() {
                init();
                if (old_onload) old_onload();
            };
        }

        load_events.push(func);
    };
})();

/*
	Base.js, version 1.1
	Copyright 2006-2007, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

var Base = function() {
	// dummy
};

Base.extend = function(_instance, _static) { // subclass
	var extend = Base.prototype.extend;
	
	// build the prototype
	Base._prototyping = true;
	var proto = new this;
	extend.call(proto, _instance);
	delete Base._prototyping;
	
	// create the wrapper for the constructor function
	//var constructor = proto.constructor.valueOf(); //-dean
	var constructor = proto.constructor;
	var klass = proto.constructor = function() {
		if (!Base._prototyping) {
			if (this._constructing || this.constructor == klass) { // instantiation
				this._constructing = true;
				constructor.apply(this, arguments);
				delete this._constructing;
			} else if (arguments[0] != null) { // casting
				return (arguments[0].extend || extend).call(arguments[0], proto);
			}
		}
	};
	
	// build the class interface
	klass.ancestor = this;
	klass.extend = this.extend;
	klass.forEach = this.forEach;
	klass.implement = this.implement;
	klass.prototype = proto;
	klass.toString = this.toString;
	klass.valueOf = function(type) {
		//return (type == "object") ? klass : constructor; //-dean
		return (type == "object") ? klass : constructor.valueOf();
	};
	extend.call(klass, _static);
	// class initialisation
	if (typeof klass.init == "function") klass.init();
	return klass;
};

Base.prototype = {	
	extend: function(source, value) {
		if (arguments.length > 1) { // extending with a name/value pair
			var ancestor = this[source];
			if (ancestor && (typeof value == "function") && // overriding a method?
				// the valueOf() comparison is to avoid circular references
				(!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
				/\bbase\b/.test(value)) {
				// get the underlying method
				var method = value.valueOf();
				// override
				value = function() {
					var previous = this.base || Base.prototype.base;
					this.base = ancestor;
					var returnValue = method.apply(this, arguments);
					this.base = previous;
					return returnValue;
				};
				// point to the underlying method
				value.valueOf = function(type) {
					return (type == "object") ? value : method;
				};
				value.toString = Base.toString;
			}
			this[source] = value;
		} else if (source) { // extending with an object literal
			var extend = Base.prototype.extend;
			// if this object has a customised extend method then use it
			if (!Base._prototyping && typeof this != "function") {
				extend = this.extend || extend;
			}
			var proto = {toSource: null};
			// do the "toString" and other methods manually
			var hidden = ["constructor", "toString", "valueOf"];
			// if we are prototyping then include the constructor
			var i = Base._prototyping ? 0 : 1;
			while (key = hidden[i++]) {
				if (source[key] != proto[key]) {
					extend.call(this, key, source[key]);

				}
			}
			// copy each of the source object's properties to this object
			for (var key in source) {
				if (!proto[key]) extend.call(this, key, source[key]);
			}
		}
		return this;
	},

	base: function() {
		// call this method from any other method to invoke that method's ancestor
	}
};

// initialise
Base = Base.extend({
	constructor: function() {
		this.extend(arguments[0]);
	}
}, {
	ancestor: Object,
	version: "1.1",
	
	forEach: function(object, block, context) {
		for (var key in object) {
			if (this.prototype[key] === undefined) {
				block.call(context, object[key], key, object);
			}
		}
	},
		
	implement: function() {
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == "function") {
				// if it's a function, call it
				arguments[i](this.prototype);
			} else {
				// add the interface using the extend method
				this.prototype.extend(arguments[i]);
			}
		}
		return this;
	},
	
	toString: function() {
		return String(this.valueOf());
	}
});

// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini

// http://dean.edwards.name/weblog/2005/10/add-event/

function addEvent(element, type, handler) {
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else {
		// assign each event handler a unique ID
		if (!handler.$$guid) handler.$$guid = addEvent.guid++;
		// create a hash table of event types for the element
		if (!element.events) element.events = {};
		// create a hash table of event handlers for each element/event pair
		var handlers = element.events[type];
		if (!handlers) {
			handlers = element.events[type] = {};
			// store the existing event handler (if there is one)
			if (element["on" + type]) {
				handlers[0] = element["on" + type];
			}
		}
		// store the event handler in the hash table
		handlers[handler.$$guid] = handler;
		// assign a global event handler to do all the work
		element["on" + type] = handleEvent;
	}
};
// a counter used to create unique IDs
addEvent.guid = 1;

function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else {
		// delete the event handler from the hash table
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid];
		}
	}
};

function handleEvent(event) {
	var returnValue = true;
	// grab the event object (IE uses a global event object)
	event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
	// get a reference to the hash table of event handlers
	var handlers = this.events[event.type];
	// execute each event handler
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}
	return returnValue;
};

function fixEvent(event) {
	// add W3C standard event methods
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};
fixEvent.preventDefault = function() {
	this.returnValue = false;
};
fixEvent.stopPropagation = function() {
	this.cancelBubble = true;
};

/**
 * @fileOverview This file contains various library functions Validatious uses
 * when in standalone mode. When bridging Validatious to frameworks you need
 * to replicate the functionality in this file leveraging the frameworks custom
 * functionality. This will help you minimize duplication.
 */
// Global namespace
if (typeof v2 === 'undefined' || v2 === null) {
  v2 = {};
}

/**
 * Checks if a string is undefined, null or empty
 */
v2.empty = function empty(obj) {
  return typeof obj == 'undefined' || obj === null || obj === '';
};

/**
 * Returns input as array. If it is an array it is returned as is, any other
 * type of input is returned as a length 1 array with the input as only element.
 *
 * If data is undefined or null, an empty array is returned.
 *
 * @param {Object} data
 * @return {Array} data if it is an array or an array with data as only element
 */
v2.array = function array(data) {
  var arr = [];

  // NodeLists
  if (data && typeof data.item === 'function') {
    for (var i = 0; i < data.length; i++) {
      arr[i] = data[i];
    }

    data = arr;
  }

  return v2.empty(data) ? [] :
    (typeof data.shift == 'undefined' ? [data] : data);
};

/**
 * Fetches the original target for an event
 *
 * @param {Event} e
 * @return {Element} the original target element
 *
 * NB! This relies on proprietary functionality and is discouraged
v2.target = function(e) {
  if (!e) {
    return null;
  }

  return e.explicitOriginalTarget || e.srcElement || e.target || null;
};*/

/**
 * Provides som object level operations. Only used inside this file. When
 * bridging, this object may be omitted if it's usage is removed from this
 * file. It is not referred from the main v2 file.
 */
v2.Object = {
  /**
   * Extend an object safely with some property. If the property is already
   * set, it will not overwrite it.
   *
   * @param {Object}  obj   Source object
   * @param {Object}  props Object literal with properties to add
   * @param {boolean} safe  If true then properties will not be overwritten
   *                        Default is false
   * @return the extended object
   */
  extend: function(obj, props, safe) {
    safe = typeof safe === 'undefined' ? false : safe;

    for (var prop in props) {
      if (safe && typeof obj[prop] !== 'undefined') {
        continue;
      }

      if (props.hasOwnProperty(prop) && typeof props[prop] !== 'undefined') {
        obj[prop] = props[prop];
      }
    }

    return obj;
  }
};

/**
 * Extensions on the string object
 */
v2.Object.extend(String.prototype, {
  strip: function() {
    return this.replace(/^\s+|\s+$/, '');
  }
});

/**
 * Extensions on the array object
 */
v2.Object.extend(Array.prototype, {

  /**
   * For each loops through every element of an array yielding successive
   * elements to a callback function
   *
  forEach: function(callback, thisObj) {
    thisObj = thisObj || this;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisObj, this[i]);
    }
  },*/

  /**
   * Finds the first occurence of an element and returns its index in the array
   * or -1 if the element is not found.
   *
   * @param {Object} el The element to look for
   * @param {int} start Optional start index, default is 0
   */
  indexOf: function(el, index) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === el) {
        return i;
      }
    }

    return -1;
  }/*,

  /**
   * Filter implementation, from http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:filter
   *
  filter: function(fun) {
    var len = this.length;

    if (typeof fun !== "function") {
      throw new TypeError();
    }

    var res = new Array();
    var thisp = arguments[1];
    var val, i;

    for (i = 0; i < len; i++) {
      if (i in this) {
        val = this[i]; // in case fun mutates this

        if (fun.call(thisp, val, i, this)) {
          res.push(val);
        }
      }
    }

    return res;
  }*/
});

/**
 * Basically wraps document.getElementById
 *
 * @param {Object} el Id as a string or element
 */
v2.$ = function(el, extend) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }

  extend = typeof extend == 'undefined' ? true : extend;

  // Don't extend elements that were already extended
  // Abort if element was not found
  if (el === null || typeof el.hide != 'undefined' || !extend) {
    return el;
  }

  // Extend element with methods in v2.Element
  for (var prop in v2.Element) if (v2.Element.hasOwnProperty(prop)) {
    // The immediate anonymous function creates a scope for fn, and avoids
    // having the reference overwritten with every iteration
    (function() {
      var fn = prop;
      var obj = {};
      obj[fn] = function() {
        // Prefill argument list with element
        var args = [el];

        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }

        return v2.Element[fn].apply(v2.Element, args);
      };

      // Safe extending, don't overwrite existing methods
      v2.Object.extend(el, obj, true);
    })();
  }

  return el;
};

/**
 * Mimics $$ function available in many modern frameworks which basically works
 * like document.querySelectorAll, which is actually used if it exists. If not,
 * the method shamelessly assumes it's supposed to return either a label element
 * or an input element since that's all validatious is using it for.
 *
 * This method is ONLY intended to help validatious find labels and inputs, DO
 * NOT use this as a general CSS selector utility, it will fail miserably.
 */
v2.$$ = function $$(selector, parent) {
  // Warning: brute force selecting ahead!

  // Default value is document
  parent = parent || document;

  // Use native implementation, if any
  if (document.querySelectorAll) {
    v2.$$ = function(sel, p) {
      return (p || document).querySelectorAll(sel);
    };

    return v2.$$(selector, parent);
  }

  // Split selectors
  // The whole splitting thing is unnecessarily complicated due to IE6 and
  // others' broken String.prototype.split method
  var selectors = selector.split(',');
  var i, j, k, tagName, tmp, tmp2, elements, element, classes, attributes, attr, value;
  var result = [];

  for (i = 0; (selector = selectors[i]); i++) {
    // Opera splits on every character with \b
    // tagName = selector.strip().split(/\b/)[0] || '*';
    tagName = selector.strip().split(/[^a-zA-Z]/)[0] || '*';
    // Avoid trouble with empty delimiters in IE6
    tmp = selector.replace(/^\./, "_.").split(/\./);

    classes = [];
    attributes = [];

    for (j = 1; j < tmp.length; j++) {
      classes.push(tmp[j].split(/[^a-zA-Z\-_]/)[0]);
    }

    // Avoid problems with empty delimiters disappearing in IE6
    tmp = selector.replace("][", "].[").split(/[\[\]]/);

    for (j = 0; j < tmp.length-1; j += 2) {
      tmp2 = tmp[j+1].split('=');
      tmp2[1] = tmp2[1] || true;
      attributes.push(tmp2);
    }

    elements = parent.getElementsByTagName(tagName);

    elementLoop: for (j = 0; (element = elements[j]); j++) {
      for (k = 0; k < classes.length; k++) {
        if (!v2.Element.hasClassName(element, classes[k])) {
          continue elementLoop;
        }
      }

      for (k = 0; k < attributes.length; k++) {
        attr = attributes[k][0];
        value = attributes[k][1];

        if (element.hasAttribute) {
          if (!element.hasAttribute(attr) ||
              (value !== true && element.getAttribute(attr) !== value)) {
            continue elementLoop;
          }
        } else {
          // IE6 makes it stink...
          attr = attr === 'for' ? 'htmlFor' : attr;

          if (typeof element[attr] === 'undefined' ||
              (value !== true && element[attr] !== value)) {
            continue elementLoop;
          }
        }
      }

      if (result.indexOf(element) < 0) {
        result.push(element);
      }
    }
  }

  return result;
};

/**
 * Additional functionality for HTML elements
 */
v2.Element = {

  /**
   * Add an event listener. Delegates to Dean Edwards addEvent function.
   *
   * @param {Element} el       The element that will observe
   * @param {String} event     The event type, without the "on" handler prefix
   * @param {Function} handler The event handler
   */
  observe: function(el, event, handler) {
    addEvent(el, event, handler);
  },

  /**
   * Finds the current computed style of an element.
   *
   * @param {Element} el  The element whose styles to compute
   * @param {String} prop The property to find computed style for
   */
  computedStyle: function(el, prop) {
    var val = '';

    if (document.defaultView && document.defaultView.getComputedStyle) {
      val = document.defaultView.getComputedStyle(el, '').getPropertyValue(prop);
    } else if (el.currentStyle) {
      prop = prop.replace(/\-(\w)/g, function (match, p1) {
        return p1.toUpperCase();
      });

      val = el.currentStyle[prop];
    }

    return val;
  },

  /**
   * Checks if an element is visible by checking that its display property
   * isn't set to none, that it's visibility property is not hidden and that
   * it's width and height are not 0.
   *
   * The methods climbs the node tree recursively and checks the element and
   * all its parent nodes.
   *
   * @param {Element} el The element to check
   */
  visible: function(el) {
    return v2.Element.computedStyle(el, 'display') != 'none' &&
           v2.Element.computedStyle(el, 'visibility') != 'hidden' &&
           (el.parentNode === null ||
            el.parentNode.nodeType != 1 ||
            v2.Element.visible(el.parentNode));
  },

  /**
   * Checks if an element has a class name
   *
   * @param {Element} el        The element to check className for
   * @param {String}  className The class name to look for
   */
  hasClassName: function(el, className) {
    return new RegExp("(^|\\s)" + className + "(\\s|$)").test(el.className);
  },

  /**
   * Adds a class name to an elements className attribute unless the name
   * already exists.
   *
   * @param {Element} el        The element to add className for
   * @param {String}  className The class name to add
   * @return the element, suitable for method chaining
   */
  addClassName: function(el, className) {
    el.className += v2.Element.hasClassName(el, className) ? '' : ' ' + className;
    el.className = el.className.replace('  ', ' ').replace(/^\s|\s$/, '');

    return el;
  },

  /**
   * Removes a class name from the elements className attribute
   *
   * @param {Element} el        The element to remove class name from
   * @param {String}  className The class name to remove, if it exists
   * @return the element, suitable for method chaining
   */
  removeClassName: function(el, className) {
    var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)");
    el.className = el.className.replace(regexp, ' ').replace('  ', ' ').replace(/^\s|\s$/, '');

    return el;
  },

  /**
   * Returns the elements position
   *
   * @param {Element} el The element to find position for
   * @return an object with x and y properties
   */
  position: function(el) {
    var pos = { x: 0, y: 0 };

    while (el !== null) {
      pos.x += el.offsetLeft;
      pos.y += el.offsetTop;
      el = el.offsetParent;
    }

    return pos;
  },

  /**
   * Scroll page to top of element
   *
   * @param {Element} el Element to scroll to
   */
  scrollTo: function(el) {
    var pos = v2.Element.position(el);
    window.scrollTo(pos.x, pos.y);
  },

  /**
   * Finds the previous element that has nodeType 1 (ie an element, no white
   * space, comments or the like).
   *
   * @return element
   */
  previous: function(el) {
    do {
      el = el.previousSibling;
    } while (el && el.nodeType !== 1);

    return el;
  }
};

/**
 * Added functionality for functions
 */
v2.Object.extend(Function.prototype, /** @scope Function.prototype */ {
  /**
   * Binds an object to a functions context/this object, and returns a
   * function object. When called the functions this will reference the
   * object it was bound to:
   *
   *   function test() {
   *     alert(this);
   *   }
   *
   *   test(); // Alerts '[object Window]'
   *
   *   var fnObj = test.bind(document);
   *
   *   fnObj(); // Alerts '[object HTMLDocument]'
   *
   * Heavily inspired by:
   *   http://laurens.vd.oever.nl/weblog/items2005/closures/closure.js
   *
   * @param {Object} me            Value for this
   */
   bind: function(me) {
     var fn = this;

     // Creates a closure cache for the function
     fn.__cc = fn.__cc || [];

     // Counts the number of objects bound to this function, effectively
     // creating object ids
     window.__coc = window.__coc || 0;

     // Create id if it doesn't aleady exist
     if (typeof me.__id == 'undefined') {
         me.__id = window.__coc++;
     }

     // Caches the closure unless it's already been cached for this object
     fn.__cc[me.__id] = fn.__cc[me.__id] || function() {
       try {
         return fn.apply(me, arguments);
       } catch(e) {
         // Fail silently...
       }
     };

     // Return cached closure
     return fn.__cc[me.__id];
   }
});

/**
 * Dom content loaded event
 */
if (typeof addDOMLoadEvent != 'undefined') {
  v2.addDOMLoadEvent = addDOMLoadEvent;
}

/**
 * Implements v2.Composite and v2.FormItem
 *
 * The composite interface is implemented using the private array __validators.
 *
 * The form item interface is implemented using the private array __errors.
 *
 * The private boolean __passOnAny is used to serve the passOnAny() method. It's
 * default value is false.
 */
v2.CompositeFormItem = Base.extend(/** @scope v2.CompositeFormItem.prototype */{
  type: 'generic', // Makes for easier type checking

  /**
   * Sets up the __validators and __errors arrays if they do'nt already exist
   */
  constructor: function() {
    if (v2.empty(this.__validators)) {
      this.__validators = [];
    }

    if (v2.empty(this.__errors)) {
      this.__errors = [];
    }

    this.__passOnAny = false;
    this.__message = null;

    this.parent = null;

    /* Exceptions
    this.__exceptions = [];
    this.__exceptionFlags = [];*/
  },

  /**
   * @see v2.Composite.add
   *
   * @param {Object} obj An object that implements v2.Composite and v2.FormItem
   */
  add: function(obj) {
    //v2.Interface.ensure(obj, [v2.Composite, v2.FormItem]);
    this.__validators.push(obj);
    obj.parent = this;
  },

  /*
   * @see v2.Composite.remove
   *
   * @param {mixed} obj Either an integer giving the index to delete or an
   *                    object to search for and delete
   *
  remove: function(obj) {
    if (typeof obj === 'number' && obj < this.__validators.length) {
      obj = this.__validators[obj];
    }

    if (typeof obj === 'object') {
      this.__validators = this.__validators.filter(function(element) {
        return element !== obj;
      });
    }
  },*/

  /**
   * @see v2.Composite.get
   *
   * @param {int} i Index to fetch, if undefined the whole collection is returned
   */
  get: function(i) {
    return !v2.empty(i) ? this.__validators[i] : this.__validators;
  },

  /**
   * @see v2.FormItem.validate
   */
  validate: function() {
    this.__errors = [];
    var valid = this.test('validate');

    if (valid) {
      // OR-validations may cause errors even though the component passes
      // Clear errors when component is valid
      this.__errors = [];
      this.onSuccess();
    } else {
      this.onFailure();
    }

    return valid;
  },

  /**
   * @see v2.FormItem.test
   */
  test: function(fn) {
    /*if (this.__passExceptions()) {
      return true;
    }*/

    var i, validator, valid = 0;
    fn = fn || 'test';

    for (i = 0; (validator = this.__validators[i]); i++) {
      if (validator[fn]()) {
        valid++;
      } else {
        this.__errors.push(validator);
      }
    }

    return this.passOnAny() && valid > 0 ||
           !this.passOnAny() && valid === this.__validators.length;
  },

  /**
   * @see v2.FormItem.getInvalid
   */
  getInvalid: function() {
    return this.__errors.length === 0 ? null : this.__errors;
  },

  /**
   * @see v2.FormItem.setMessage
   *
   * @param {v2.Message} message
   */
  setMessage: function(message) {
    this.__message = message;
  },

  /**
   * @see v2.FormItem.getMessages
   */
  getMessages: function() {
    if (!v2.empty(this.__message)) {
      return [this.__message];
    }

    var messages = [], i, validator;

    for (i = 0, validator; (validator = this.__errors[i]); i++) {
      messages = messages.concat(validator.getMessages());
    }

    return messages;
  },

  /**
   * @see v2.FormItem.passOnAny
   */
  passOnAny: function(value) {
    if (typeof value !== 'undefined') {
      this.__passOnAny = !!value;
    }

    return this.__passOnAny;
  },

  /**
   * @see v2.FormItem.onSuccess
   *
   * Does nothing
   */
  onSuccess: function() {},

  /**
   * @see v2.FormItem.onFailure
   *
   * Does nothing
   */
  onFailure: function() {}/*,

  /*
   * Add a component to depend on. When validating
   *
   * @param {v2.CompositeFormItem} cfi The component to depend on
   * @param {boolean} flag If true the component must pass, otherwise it must
   *                       fail. Default value is true
   *
  addException: function(cfi, flag) {
    this.__exceptions.push(cfi);
    this.__exceptionFlags.push(typeof flag === 'undefined' ? true : flag);
  },

  /*
   * Checks that all dependencies pass (or fails, depending on the flag value)
   *
  __passExceptions: function() {
    if (this.__exceptions.length === 0) {
      return false;
    }

    for (var i = 0, component; (component = this.__exceptions[i]); i++) {
      if (!(component.test() && this.__exceptionFlags[i])) {
        return false;
      }
    }

    return true;
  }*/
});

/**
 * Generic input control
 *
 * @implements v2.FieldElement
 */
v2.InputElement = Base.extend(/** @scope v2.InputElement.prototype */{

  /**
   * Construct a new input control
   *
   * @param {Array} elements The elements that make up this control. May be a
   *                         single object instead of an array
   * @param {Array} events   The type of "instant" events the elements support
   */
  constructor: function(elements, events) {
    // Initialize properties
    this.__name = null;
    this.__events = v2.empty(events) ? ['blur'] : v2.array(events);
    this.__elements = v2.array(elements);
  },

  /**
   * Monitor field with a function.
   *
   * @param {Function} eventHandler
   */
  monitor: function(eventHandler) {
    this.__monitored = true;
    var i, j, element, event;

    for (i = 0; (element = this.__elements[i]); i++) {
      for (j = 0; (event = this.__events[j]); j++) {
        v2.Element.observe(element, event, eventHandler);
      }
    }
  },

  /**
   * @see v2.FieldElement.getValue
   *
   * Default implementation returns the value attribute of the first element.
   */
  getValue: function() {
    return this.__elements[0].value;
  },

  /**
   * @see v2.FieldElement.getLabel
   *
   * Default implementation looks up the label that is linked to the first
   * element through the for/id attributes
   */
  getLabel: function() {
    var el = this.__elements[0];
    var label = v2.$$('label[for=' + (el.id || el.name) + ']', el.form);

    return label && label[0];
  },

  /**
   * @see v2.FieldElement.getName
   */
  getName: function() {
    if (this.__name) {
      return this.__name;
    }

    var label = this.getLabel();

    if (label) {
      return label.title !== '' ? label.title : label.innerHTML;
    }

    var el = this.__elements[0];
    return el.id || el.name;
  },

  /**
   * @see v2.FieldElement.setName
   */
  setName: function(name) {
    this.__name = !!name ? name : null;

    return this;
  },

  /**
   * @see v2.FieldElement.getParent
   */
  getParent: function() {
    return this.__elements[0].parentNode;
  },

  /**
   * @see v2.FieldElement.getElements
   */
  getElements: function() {
    return this.__elements;
  },

  /**
   * @see v2.FieldElement.visible
   */
  visible: function() {
    if (!v2.$(this.getParent()).visible()) {
      return false;
    }

    for (var i = 0, el; (el = this.__elements[i]); i++) {
      if (v2.Element.visible(el)) {
        return true;
      }
    }

    return false;
  }
}, /** @scope v2.InputElement */{
  __fields: {},

  /**
   * Factory method for creating and retriving field objects. Only one field
   * instance is needed per actual form field. The factory method never
   * recreates a previously created object, and it simplifies the task of
   * choosing obejct type.
   *
   * @param {Object} idNameEl The parameter may be one of three things:
   *                          1) String: id of an element. For multi option
   *                             controls, this may be the id of one element
   *                             in the collection.
   *                          2) String: name of an element. Same rules as for
   *                             id parameter.
   *                          3) Element: a single element in the collection (or
   *                             the actual only one). Same rules as for id.
   * @return {v2.Field} a field object
   */
  get: function(idNameEl) {
    if (idNameEl && idNameEl.constructor === v2.InputElement) {
      return idNameEl;
    }

    var element = v2.$(idNameEl), id, field, elements, selector, className, pattern;

    // Argument was name string
    if (!element) {
      selector = 'input$, select$, textarea$';
      elements = v2.$$(selector.replace(/\$/g, '[name=' + idNameEl + ']'));
      element = elements[0];
    }

    // Invalid element argument
    if (!element) {
      throw new TypeError(idNameEl + ' does not resolve to an HTML element!');
    }

    // Look up element field object - prefer name over id as identifier since it
    // will return the same element for all radio buttons (common name but
    // individual ids)
    id = element.name || element.id;

    if ((field = v2.InputElement.__fields[id])) {
      return field;
    }

    // Create new object of the right type
    if (element.options) {
      // Select boxes
      field = new v2.SelectElement(element);
    } else if (element.tagName.toLowerCase() === 'textarea') {
      // Textareas
      field = new v2.TextareaElement(element);
    } else if (element.type && element.type == 'radio') {
      // Radio buttons
      elements = v2.$$('input[type=radio][name=' + element.name + ']', element.form);
      field = new v2.RadioElement(elements);
    } else if (element.type && element.type == 'checkbox') {
      // Checkboxes
      className = element.className;
      pattern = /\bg_([^\s]*)\b/;
      elements = pattern.test(className) ? v2.$$('input[type=checkbox].g_' + className.match(pattern)[1], element.form) : [element];
      field = new v2.CheckboxElement(elements);
    } else {
      // Input elements (text inputs)
      field = new v2.InputElement(element);
    }

    return (v2.InputElement.__fields[id] = field);
  }
});

/**
 * Alias/shorthand for v2.InputElement.get
 */
v2.$f = v2.InputElement.get;

/**
 * Radio button fields with validation logic
 *
 * @implements v2.Composite
 * @implements v2.FormItem
 * @implements v2.FieldElement
 */
v2.RadioElement = v2.InputElement.extend(/** @scope v2.RadioElement.prototype */{
  /**
   * Construct a new radio field
   * @see v2.InputElement.constructor
   */
  constructor: function(elements) {
    // Regular initialization, override events
    this.base(elements, ['click', 'change']);
  },

  /**
   * @see v2.FieldElement.getValue
   *
   * Returns the value attribute of the currently selected radio button
   */
  getValue: function() {
    for (var i = 0, radio; (radio = this.__elements[i]); i++) {
      if (radio.checked) {
        return radio.value;
      }
    }

    return null;
  },

  /**
   * @see v2.FieldElement.getLabel
   *
   * A radio button field is assumed to be either a list - ordered or unordered -
   * with some element in front that acts as a label. This may be any element.
   *
   * If it is not in a list (ie the element does not have <li> parent elements),
   * the label is assumed to be the element before the first input element.
   *
   * Example (list approach):
   *
   *   <h2>Favourite food:</h2>
   *   <ul>
   *     <li>
   *       <input type="radio" name="food" value="hamburger" id="food_hamburger" />
   *       <label for="food_hamburger">Haburger</label>
   *     </li>
   *     <li>
   *       <input type="radio" name="food" value="pizza" id="food_pizza" />
   *       <label for="food_pizza">Pizza</label>
   *     </li>
   *   </ul>
   *
   * getLabel() will in this case return the h2 element.
   *
   * Example (no list).
   *
   *   <label class="groupLabel">Favourite food:</label>
   *   <input type="radio" name="food" value="hamburger" id="food_hamburger" />
   *   <label for="food_hamburger">Hamburger</label>
   *   <input type="radio" name="food" value="pizza" id="food_pizza" />
   *   <label for="food_pizza">Pizza</label>
   *
   * getLabel() will in this case return the first label element
   */
  getLabel: function() {
    var parent = this.__elements[0].parentNode;

    if (parent.tagName.toLowerCase() === 'li') {
      return v2.$(parent.parentNode).previous();
    }

    var element = v2.$(this.__elements[0]).previous();
    return element || this.base();
  },

  /**
   * @see v2.FieldElement.getParent
   * @return the parent node unless it's an li element. If it is, the list
   *         elements parent is returned
   */
  getParent: function() {
    var parent = this.__elements[0].parentNode;

    return parent.tagName.toLowerCase() === 'li' ? parent.parentNode.parentNode : parent;
  }
});

/**
 * Input controls based on select boxes
 *
 * @implements v2.FieldElement
 */
v2.SelectElement = v2.InputElement.extend(/** @scope v2.SelectElement.prototype */{

  /**
   * Construct a new select field
   * @see v2.FieldElement.constructor
   */
  constructor: function(select) {
    // Regular initialization, add select specific event
    this.base([select], 'change');
  },

  /**
   * @see v2.FieldElement.getValue
   *
   * Returns the value attribute of the currently selected option. For multi
   * selects, it returns an array of value attributes for each selected option.
   */
  getValue: function() {
    var select = this.__elements[0];

    if (!select.multiple) {
      return select.options[select.selectedIndex].value;
    }

    var values = [];

    for (var i = 0, option; (option = select.options[i]); i++) {
      if (option.selected) {
        values.push(option.value);
      }
    }

    return values;
  }
});

/**
 * Textarea input control
 *
 * @implements v2.FieldElement
 */
v2.TextareaElement = v2.InputElement.extend(/** @scope v2.TextareaElement.prototype */{
});

/**
 * Checkbox input controls
 *
 * @implements v2.FieldElement
 */
v2.CheckboxElement = v2.RadioElement.extend(/** @scope v2.CheckboxElement.prototype */{

  /**
   * @see v2.RadioElement.getValue
   * @return {Array} Value attribute of every selected checkbox
   */
  getValue: function() {
    var values = [], i, checkbox;

    for (i = 0, checkbox; (checkbox = this.__elements[i]); i++) {
      if (checkbox.checked) {
        values.push(checkbox.value);
      }
    }

    return values;
  }
});

/**
 * @class The message object store an error message with interpolated
 * parameters.
 */
v2.Message = Base.extend(/** @scope v2.Message */{
  /**
   * Constructs a new message
   *
   * @param {String} message The message string.
   * @param {Array}  params  Array of parameters if the string makes use of
   *                         variables to be interpolated into the string
   * @param {Array}  values  Array of parameter values, if any
   */
  constructor: function(message, params, values) {
    this.message = message;
    this.params = params || [];
    this.values = values || [];
  },

  /**
   * @return a new v2.Message object with the same message, params and values
   *         as this (shallow copy)
   */
  copy: function() {
    return new v2.Message(this.message, this.params, this.values);
  },

  /**
   * Returns the string interpolated with parameter values
   */
  toString: function() {
    var str = this.message + '';

    for (var i = 0, param = null; (param = this.params[i]); i++) {
      str = str.replace('${' + param + '}', this.values[i]);
    }

    return str;
  }
});

/**
 * @class A validator encapsulates the logic required to validate a value with
 * some parameters.
 */
v2.Validator = Base.extend(/** @scope v2.Validator.prototype */{
  constructor: function(name, fn, message, params, aliases) {
    this.__name = name;
    this.__test = fn;
    this.__message = new v2.Message(message || '${field} does not pass ' + name + ' validator', params);
    this.__aliases = v2.array(aliases);
    this.acceptEmpty = true;
  },

  /**
   * Test a value given some parameters.
   */
  test: function(field, params, invert) {
    invert = typeof invert === 'undefined' ? false : invert;

    var value = field.getValue();
    var result = (this.acceptEmpty && value === '') ||
      this.__test(field, value, params);

    return (result && !invert) || (!result && invert);
  },

  /**
   * @return the name of the validator
   */
  getName: function() {
    return this.__name;
  },

  /**
   * @return the message object
   */
  getMessage: function() {
    return this.__message;
  },

  /**
   * @param {String} message New error message
   */
  setMessage: function(message) {
    this.__message.message = message;
  }
}, /** @scope v2.Validator */{
  validators: {},

  /**
   * Adds a validator and returns a proper v2.Validator object. This method
   * takes a single object as parameter, and fetches options from object
   * properties:
   *
   * @param {String}   name        Validators name
   * @param {Function} fn          The test function, should accept two
   *                               parameters: value and parameters (array)
   * @param {String}   message     Default error message
   * @param {Array}    params      Option strings to replace in the message string
   * @param {Array}    aliases     Additional aliases for the validator, may be
   *                               a string, an array or nothing
   * @param {boolean}  acceptEmpty If false, the validator will fail empty
   *                               values. Default is true.
   */
  add: function(options) {
    if (!options.name || !options.fn) {
      throw new TypeError('Options object should contain name and fn');
    }

    // Merge options with default options
    options = v2.Object.extend({ params: [], aliases: [], acceptEmpty: true }, options, false);

    var params = v2.array(options.params);
    var validator = new v2.Validator(options.name, options.fn, options.message, params, options.aliases);
    validator.acceptEmpty = options.acceptEmpty;

    var names = v2.array(options.aliases).concat([options.name]);

    for (var i = 0, name; (name = names[i]); i++) {
      v2.Validator.validators[name] = validator;
    }

    return validator;
  },

  /**
   * Frontend to the add method. Adds a validator, only with "normal" parameters
   * instead of a single object literal options "hash".
   *
   * @param {String}   name        Validators name
   * @param {Function} fn          The test function, should accept two
   *                               parameters: value and parameters (array)
   * @param {Array}    params      Option strings to replace in the message string
   * @param {String}   message     Default error message
   * @param {Array}    aliases     Additional aliases for the validator, may be
   *                               a string, an array or nothing
   * @param {boolean}  acceptEmpty If false, the validator will fail empty
   *                               values. Default is true.
   */
  reg: function(name, fn, params, message, aliases, acceptEmpty) {
    return v2.Validator.add({ name: name,
                              fn: fn,
                              message: message,
                              params: params,
                              aliases: aliases,
                              acceptEmpty: acceptEmpty });
  },

  /**
   * Get the validator with the given name. Searches all validators aliases as
   * well.
   *
   * @param {String}  name        The validator to fetch
   */
  get: function(name) {
    var validator;

    if (name.constructor === v2.Validator) {
      return name;
    }

    if ((validator = v2.Validator.validators[name])) {
      return validator;
    }

    return null;
  }
});

/**
 * Shorthand for v2.Validator.get
 */
v2.$v = function(name) {
  return v2.Validator.get(name);
};

/**
 * Set new message for validator. If the validator does not exist, an exception
 * is thrown. This method will accept either two strings - a validator name and
 * message, OR an object where the property names will be interpreted as
 * validator names, and property values as messages. When the single parameter
 * is an object, non-existent validators are silently bypassed, whereas for two
 * strings, an exception is thrown for non-existent validators.
 *
 * @param {String} name    The validator to update message for, or an object
 * @param {String} message The new error message
 */
v2.$msg = function(/*name, message*/) {
  if (arguments.length === 2) {
    return v2.Validator.get(arguments[0]).setMessage(arguments[1]);
  }

  for (var validator in arguments[0]) {
    try {
      v2.Validator.get(validator).setMessage(arguments[0][validator]);
    } catch(e) {
      // Fail silently
    }
  }
};

/**
 * Fields with validation logic
 *
 * @implements v2.Composite
 * @implements v2.FormItem
 */
v2.Field = v2.CompositeFormItem.extend(/** @scope v2.Field.prototype */{
  validateHidden: false,      // If a field should be validated even if it's not
                              // visible
  instant: false,             // If validations should be run instantly
  instantWhenValidated: true, // If validations should be run instantly after
                              // the validation has been run once
  type: 'field',              // Identifier, makes for easier type checking

  /**
   * Construct a new field with validation logic
   *
   * @param {v2.FieldElement} element The element to add validation for
   * @param {boolean}         instant
   * @param {boolean}         instantWhenValidated
   */
  constructor: function(element, instant, instantWhenValidated) {
    // Regular initialization
    this.base();

    // Initialize properties
    this.__monitored = false;
    this.element = v2.$f(element);
    this.instant = typeof instant !== 'undefined' ? instant : this.instant;
    this.instantWhenValidated = typeof instantWhenValidated !== 'undefined' ? instantWhenValidated : this.instantWhenValidated;

    // Monitor if field is "instant"
    this.__monitor(this.instant);
  },

  /**
   * Checks that a field is valid. If the validateHidden boolean is set to true,
   * the method returns true if the field is visible.
   */
  test: function() {
    // Return true if we should not validate hidden fields, and field is hidden
    if (!this.validateHidden && !this.element.visible()) {
      return true;
    }

    return this.base();
  },

  /**
   * Validate field. Also starts monitoring the field if it is configured to be
   * "instantWhenValidated"
   */
  validate: function() {
    this.__monitor(this.instantWhenValidated && !this.__monitored);
    return this.base();
  },

  /**
   * Adds a field validator to this field
   *
   * @param {String} name    The name of the validator
   * @param {Array}  params  Parameters for the field validator
   * @param {String} message Custom error message for this validation
   */
  addValidator: function(name, params, message) {
    var validator = v2.$v(name);

    if (validator === null) {
      throw new Error(name + ' is not a valid validator');
    }

    if (typeof message !== 'undefined' && message !== null) {
      message = new v2.Message(message, validator.getMessage().params);
    }

    var fv = new v2.FieldValidator(this.element, validator, v2.array(params), message);
    this.add(fv);

    return fv;
  },

  /**
   * Returns the parent element for the field
   */
  getParent: function() {
    return this.element.getParent();
  },

  /**
   * Private method: monitor field. Gives immediate respons on whether or not a
   * field is valid by adding the validate method as a listener to element
   * appropriate events.
   *
   * @param {boolean} condition a condition to meet before monitoring
   */
  __monitor: function(condition) {
    if (!condition || this.__monitored) {
      return;
    }

    this.__monitored = true;
    var obj = this.parent && this.parent.type === 'fieldset' ? this.parent : this;
	var validate = obj.validate.bind(this);

    this.element.monitor(function(e) {
		validate(e);
	});
  }
});

/**
 * Fieldsets (collections, could be divs or anything else too) with validation
 * logic. Provides a hook to add onFailure and onSuccess callbacks to form
 * blocks, but no other special functionality.
 *
 * @implements v2.Composite
 * @implements v2.FormItem
 */
v2.Fieldset = v2.CompositeFormItem.extend(/** @scope v2.Fieldset.prototype */{
  type: 'fieldset', // Makes for easier typechecking

  /**
   * Construct a new fieldset with validation logic
   *
   * @param {Element} element The parent block element
   */
  constructor: function(element) {
    // Regular initialization
    this.base();
    this.element = element;
  },

  /**
   * Returns the parent element for the field
   */
  getParent: function() {
    return this.element;
  }
});

/**
 * @class Represents a single field and validator along with an optional custom
 * error message when the default message is not suitable.
 */
v2.FieldValidator = Base.extend(/** @scope v2.FieldValidator.prototype */{
  invert: false,

  /**
   * Creates a new field validator.
   *
   * @param {v2.InputElement} field     The field to validate
   * @param {Array}           validator Validator
   * @param {Array}           params    Parameters
   * @param {String}          msg       Optional error message. If empty,
   *                                    default message for the validator is
   *                                    used.
   */
  constructor: function(field, validator, params, msg) {
    //v2.Interface.ensure(field, v2.FieldElement);
    this.__field = field;
    this.__validator = validator;
    this.__params = v2.array(params);
    this.__message = msg || validator.__message.copy();
    var errorSwitches = this.__message.params;

    if (errorSwitches.length < 1 || errorSwitches[0] !== 'field') {
      this.__message.params = ['field'].concat(errorSwitches);
    }

    this.__message.values = [this.__field.getName()].concat(this.__params);
  },

  /**
   * Returns true if the field passes the value given the parameters
   */
  test: function() {
    return this.__validator.test(this.__field, this.__params, this.invert);
  },

  /**
   * Calls test()
   */
  validate: function() {
    return this.test();
  },

  /**
   * Returns this object if it fails validation
   */
  getInvalid: function() {
    return !this.test() ? this : null;
  },

  /**
   * Updates the error message
   */
  setMessage: function(message) {
    this.__message.message = message;
  },

  /**
   * Returns the error message
   */
  getMessages: function() {
    return [this.__message.toString()];
  },

  add: function() {},
  remove: function() {},
  get: function() {},
  passOnAny: function() {},
  onSuccess: function() {},
  onFailure: function() {}
});

/**
 * Forms with validation logic. Implements the v2.Composite and v2.FormItem
 * interfaces.
 */
v2.Form = v2.CompositeFormItem.extend(/** @scope v2.Form.prototype */{
  type: 'form', // Eases type checking

  /**
   * Construct new form with validation logic.
   *
   * @param {Object} form Either a string id or a form element
   */
  constructor: function(form) {
    // Superclass constructor
    this.base();
    this.__form = v2.$(form);
    this.__form.observe('submit', this.validate.bind(this));
    this.__buttons = [];
    this.__activeButton = null;
  },

  /**
   * Add a button that should trigger validation. If no buttons are added, all
   * buttons will trigger validation. If a single button is added, every button
   * that should trigger validation must be explicitly added.
   *
   * @param {InputElement} button An input element
   */
  addButton: function(button) {
    this.__buttons.push(button);

    v2.Element.observe(button, 'click', (function(e) {
      this.__activeButton = button;
    }).bind(this));
  },

  /**
   * Validates a form. If the event parameter is provided it will check that the
   * button is supposed to trigger validation, and it will prevent the submit
   * if the validation is unsuccessful.
   *
   * @param {Event} e Event object, optional
   */
  validate: function() {
    var event = arguments.length > 0 ? arguments[0] : null;
    var buttons = this.__buttons;
    var button = this.__activeButton;
    this.__activeButton = null;

    if (buttons.length > 0 &&
        buttons.indexOf(button) < 0) {
      return true;
    }

    var valid = this.base();

    if (!valid && event) {
      event.preventDefault();
      event.returnValue = false;
    }

    return valid;
  }
}, /** @scope v2.Form */{
  forms: {},

  /**
   * Get instance for HTML form element or string representing a form element id
   *
   * @param {Object} idORElement
   */
  get: function(idOrElement) {
    var element = v2.$(idOrElement), instance;

    if (element === null || element.tagName.toLowerCase() !== 'form') {
      throw new ArgumentError('idOrElement should represent a form element');
    }

    if (!v2.empty(instance = v2.Form.forms[element.id])) {
      return instance;
    }

    return (v2.Form.forms[element.id] = new v2.Form(element));
  }
});

(function() {
  var v = v2.Validator;
  /**
   * Validates that a value contans only letters.
   *
   * @builtin
   */
  v.reg('alpha', function(field, value, params) {
    return /^[a-zA-Z\u00A1-\uFFFF]*$/.test(value);
  });
  
  /**
   * Validates that a value only contains letters and numbers.
   *
   * @builtin
   */
  v.reg('alphanum', function(field, value, params) {
    return /^([a-zA-Z\u00A1-\uFFFF0-9])*$/.test(value);
  });
  
  /**
   * Validates that a value is a confirmation of another field.
   *
   * @builtin
   */
  v.reg('confirmation-of', function(field, value, params) {
    return value === v2.$f(params[0]).getValue();
  }, 'field-id', '${field} should be an exact match', null, false);
  
  /**
   * Validates a value as an email address.
   *
   * @builtin
   */
  v.reg('email', function(field, value, params) {
    // This doesn't compress... http://www.regular-expressions.info/email.html
    return /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value);
  });
  
  /**
   * Validates the length of a field; the first parameter sets the maximum
   * allowed length. The length parameter is available in error messages as
   * <code>${max}</code>.
   *
   * @builtin
   */
  v.reg('max-length', function(field, value, params) {
    return value.length < params[0];
  }, 'max');
  
  /**
   * Validates that a value is no bigger than params[0]. Mostly for numbers, but
   * also works for strings. The value parameter is available in error messages as
   * <code>${max}</code>.
   *
   * @builtin
   */
  v.reg('max-val', function(field, value, params) {
    return value <= params[0];
  }, 'max');
  
  /**
   * Validate the length of a field; the first parameter sets the minimum length
   * required. The length parameter is available in error messages as
   * <code>${min}</code>.
   *
   * @builtin
   */
  v.reg('min-length', function(field, value, params) {
    return value.length >= params[0];
  }, 'min');
  
  /**
   * Validates that a value is bigger than params[0]. Mostly for numbers, but
   * it'll work for strings as well. The value parameter is available in error messages as
   * <code>${min}</code>.
   *
   * @builtin
   */
  v.reg('min-val', function(field, value, params) {
    return value >= params[0];
  }, 'min');
  
  /**
   * Validates that a value only contains numbers.
   *
   * @builtin
   */
  v.reg('numeric', function(field, value, params) {
    return /^[0-9]*(\.[0-9]+)?$/.test(value);
  });
  
  /**
   * Validates that a field has a value.
   *
   * @builtin
   */
  v.reg('required', function(field, value, params) {
    return !v2.empty(value) && !(typeof value.length !== 'undefined' && value.length === 0);
  }, null, null, 'not-empty', false);
  
  /**
   * Validates that a value is a valid URL.
   *
   * @builtin
   */
  v.reg('url', function(field, value, params) {
    return /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(value);
  });
  
  /**
   * Validates that a value contains only letters, numbers, spaces, tabs,
   * underscores and dashes.
   *
   * @builtin
   */
  v.reg('word', function(field, value, params) {
    return /^([a-zA-Z\u00A1-\uFFFF0-9_\-\s\t])*$/.test(value);
  });
  
})();

/**
 * English default error messages
 */
v2.$msg({
  'alpha': '${field} should only contain letters',
  'alphanum': '${field} should only contain letters and numbers',
  'car-regnum-nor': '${field} should be a valid norwegian auto registration number',
  'confirmation-of': '${field} should be a confirmation of ${field-id}',
  'email': '${field} should be a valid email address',
  'max-length': '${field} should be no more than ${max} characters long',
  'max-val': '${field} should be no bigger than ${min}',
  'min-length': '${field} should be atleast ${min} characters long',
  'min-val': '${field} should be atleast ${min}',
  'numeric': '${field} should only contain numbers',
  'phone-nor': '${field} should be a valid norwegian phone number',
  'required': '${field} is required',
  'ssn-nor': '${field} should be a valid norwegian social security number',
  'url': '${field} should be a valid URL',
  'word': '${field} should only contain letters, numbers and punctuation'
});

/**
 * Provides facades with methods to allow for a natural language
 * like API.
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @version 0.9
 * @license BSD
 */

/**
 * Top level DSL functionality. Use v2.dsl.expose() to expose methods to the
 * global namespace.
 */
v2.dsl = /** @scope v2.dsl */{
  /**
   * Creates a validate function. The conditional parameter decides if the
   * function should require all validators, or only one.
   *
   * @param {boolean} conditional   If true, all validators are required
   */
  __validateTemplate: function(conditional) {
    return function() {
      var field = arguments[0];
      var element = field.element || (field.item ? field.item.element : null) || null;

      if (element === null) {
        while (!!field && !field.element) {
          field = field.get(0);
        }
      }

      var form = new v2.dsl.Form(element.getElements()[0].form);
      form.item.passOnAny(conditional);

      for (var i = 0, component; (component = arguments[i]); i++) {
        form.item.add(component.item || component);
      }

      return form;
    };
  },

  /**
   * Returns a function that joins composite form item objects. The conditional
   * decides if all items are required or not.
   *
   * @param {boolean} conditional
   */
  __andOr: function(conditional) {
    return function() {
      var cfi = new v2.dsl.Collection();
      cfi.item.passOnAny(conditional);

      for (var i = 0, component; (component = arguments[i]); i++) {
        cfi.item.add(component.item);
      }

      return cfi;
    };
  }
};

/**
 * Exposes DSL utilities (validate, validateAll, validateAny, and, or)
 * to the global namespace
 */
v2.dsl.expose = function() {
  var v = v2.dsl;

  v2.Object.extend(window, /** @scope window */{
    validate: v.validate,
    validateAll: v.validateAll,
    validateAny: v.validateAny,
    and: v.and,
    or: v.or
  }, false);
};

/**
 * Validate a form with a set of validators, require all validators to pass in
 * order to pass the form.
 *
 * Aliased as v2.validate
 */
v2.dsl.validateAll = v2.dsl.validate = v2.dsl.__validateTemplate(false);

/**
 * Validate a form with a set of validators, require only a single validators to
 * pass in order to pass the form.
 */
v2.dsl.validateAny = v2.dsl.__validateTemplate(true);

/**
 * Joins composite form item objects. Requires all components to pass.
 */
v2.dsl.and = v2.dsl.__andOr(false);

/**
 * Joins composite form item objects. Requires any components to pass.
 */
v2.dsl.or = v2.dsl.__andOr(true);

/**
 * Augment string objects to allow for syntax where validators are added
 * directly to strings which represent element selectors.
 */
v2.Object.extend(String.prototype, {
  /**
   * Use a string as an input element id/name. Applies the validator to the
   * field and returns the field object.
   *
   * Only supports strings as field ids, not arbitrary selectors.
   *
   * This method is also aliased as isA, isAn, has, hasA and hasAn
   *
   * @param {String} validator The validator to add
   * @param {Array}  params    Optional parameters
   * @return {v2.dsl.Field} the field object
   */
  is: function(validator, params) {
    var facade = new v2.dsl.Field(this.toString());
    return facade.addValidator(validator, params);
  }
});

/**
 * isA, isAn, has, hasA, hasAn - aliases for String.prototype.isA
 */
(function() {
  var s = String.prototype;
  s.isA = s.isAn = s.has = s.hasA = s.hasAn = s.is;
})();

/**
 * DSL capabilities for fields
 */
v2.dsl.Field = Base.extend(/** @scope v2.dsl.Field.prototype */{
  __currentValidator: null,
  __and: null,

  /**
   * Wraps a v2.Field object in a facade API. The field object is available
   * through the public property field.
   */
  constructor: function(stringOrId) {
    this.item = new v2.Field(stringOrId);
  },

  /**
   * Adds a validator to this field. If the method has previously been called with a
   * different value for the conditional this method will throw an exception.
   *
   * Aliased as and, andIs, andHas, or, orIs, orHas
   *
   * @param {String}  validator The validator to add
   * @param {Array}   params    Optional parameters
   * @param {boolean} and       If true, this field must pass all validators
   * @return {v2.dsl.Field} this object
   */
  addValidator: function(validator, params, and) {
    if (typeof and !== "undefined") {
      if (this.__and !== null && this.__and !== and) {
        throw new Error("Field previously set up with " +
                        (this.__and ? "AND" : "OR") +
                        ", unable to shift");
      }

      this.__and = and;
      this.item.passOnAny(!and);
    }

    this.__currentValidator = this.item.addValidator(validator, params);

    return this;
  },

  /**
   * Adds more validators. Throws an exception if it is invoked before any
   * validators are added.
   *
   * @param {String}  validator   The validator to add
   * @param {Array}   params      Optional parameters
   * @return {v2.dsl.Field} this object
   */
  and: function(validator, params) {
    if (!this.__currentValidator) {
      throw new Error("Cannot add more validators when no validators are added yet");
    }

    return this.addValidator(validator, params, true);
  },

  /**
   * Adds more validators. Throws an exception if it is invoked before any
   * validators are added.
   *
   * @param {String}  validator   The validator to add
   * @param {Array}   params      Optional parameters
   * @return {v2.dsl.Field} this object
   */
  or: function(validator, params) {
    if (!!this.__currentValidator) {
      throw new Error("Cannot add more validators when no validators are added yet");
    }

    return this.addValidator(validator, params, false);
  },

  /**
   * Adds a custom error message to the current validator
   *
   * @param {String} message The message
   */
  explain: function(message) {
    if (!this.__currentValidator) {
      throw new Error('No active field validator');
    }

    this.__currentValidator.setMessage(message);

    return this;
  },

  /**
   * Adds a custom error message to the field
   *
   * @param {String} message The message
   */
  help: function(message) {
    this.item.setMessage(message);

    return this;
  },

  /**
   * Sets the name of the field element
   */
  withName: function(name) {
    this.item.element.setName(name);

    return this;
  }
});

/**
 * orIs, orIsA, orIsAn, orHas, orHasA, orHasAn are aliases for v2.dsl.Field.or
 * andIs, andIsA, andIsAn, andHas, andHasA, andHasAn are aliases for v2.dsl.Field.and
 */
(function() {
  var v = v2.dsl.Field.prototype;
  v.orIs = v.orIsA = v.orIsAn = v.orHas = v.orHasA = v.orHasAn = v.or;
  v.andIs = v.andIsA = v.andIsAn = v.andHas = v.andHasA = v.andHasAn = v.and;
})();

/**
 * Field collections with DSL capabilities
 */
v2.dsl.Collection = Base.extend(/** @scope v2.dsl.Collection.prototype */{
  /**
   * Create a new fieldset/collection
   */
  constructor: function() {
    this.item = new v2.CompositeFormItem();
  },

  /**
   * Set a custom error message for the entire collection
   *
   * @param {String} message The custom error message
   */
  explain: function(message) {
    this.item.setMessage(message);
  }
});

/**
 * Forms with DSL capabilities
 */
v2.dsl.Form = Base.extend(/** @scope v2.dsl.Form.prototype */{
  /**
   * Create a new form
   */
  constructor: function(id) {
    this.item = v2.Form.get(id);
  },

  /**
   * Add a button as a validation trigger
   *
   * @param {String|Object} button Button object or string id. If the element is
   *                               not an input element, then the first child
   *                               element that is an input is used.
   *                               The method accepts arbitrary many arguments
   */
  on: function() {
    var i, button;

    for (i = 0; i < arguments.length; i++) {
      button = v2.$(arguments[i]);

      this.item.addButton(button.tagName.toLowerCase() !== 'input' ?
                 button.getElementsByTagName('input')[0] : button);
    }
  }
});

/**
 * Provides a declarative way of adding form validation through semantic HTML.
 * More specifically, by adding the class name 'validate' (customizable through
 * v2.Form.autoValidateClass) to a form, every input, select and textarea
 * element will be searched for validators through their class names. Validators
 * are class names that correspond to registered validators.
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @version 0.9
 * @license BSD
 */

/**
 * Addons to the v2.Validator "class" object. Adds the prefix setting that can
 * be used when validator names may interfere with other class names in your
 * system. By default the prefix is empty, which means that
 *   <input ... class="required" />
 *
 * will enable the required validator.
 *
 * By setting
 *   v2.Validator.prefix = 'v2_';
 *
 *   <input ... class="required" />
 *
 * will no longer enable the validator, however, you can enable it through
 *   <input ... class="v2_required" />
 *
 * Prefix may not contain spaces. If you care about valid HTML you should also
 * avoid characters that are not allowed in HTML class names, allthough
 * Validatious will work fine with them.
 */
v2.Object.extend(v2.Validator, /** @scope v2.Validator */{
  prefix: ''
});

/**
 * Adds two settings to the v2.Form "class" object;
 *
 * autoValidateClass (default value 'validate')
 * All forms with this class name will have validation logic added to them. Any
 * form not having this class will not be touched.
 *
 * actionButtonClass (default value 'action')
 * This property decides which class name to look up action buttons on. Any
 * buttons with this class name will be added to the button list. If there are
 * no buttons with this class, all buttons trigger validation. If there are any
 * buttons with this class name, only these buttons will trigger validation.
 */
v2.Object.extend(v2.Form, {
  autoValidateClass: 'validate',
  actionButtonClass: 'action'
});

v2.html = {
  validateAnyClass: 'validate_any',
  validateAllClass: 'validate_all',

  /**
   * Resolves validators by splitting a string on underscores. A string may
   * specify a validator in the following way:
   *
   * (prefix)?(not_)?name(_param)*
   *
   * That is:
   *   - Start string with optional prefix. This prefix is configured through
   *     v2.Validator.prefix
   *   - Optional not_ prefix. This will cause the validator to be inverted.
   *   - Validator name can be any existing validator (including aliases).
   *   - An optional list of parameters, for instance: min-length_3
   *
   * @param {String} names Potential validator names. Validators that aren't
   *                       found are silently ignored
   * @return an array of objects containing properties validator and params
   */
  validatorsFromString: function(names) {
    var prefixStr = v2.Validator.prefix;
    var prefix = new RegExp("^" + prefixStr, '');
    var i/*, j*/, className, invert, /*param, */params, validator, validators = [];
    names = names.split(' ');

    // Loop classes
    for (i = 0; (className = names[i]); i++) {
      invert = false;

      // Don't continue without prefix if a prefix is configured
      if (!v2.empty(prefixStr) && !prefix.test(className)) {
        continue;
      }

      // Strip out prefix
      className = className.replace(prefix, '');

      // Check if validator should be inverted
      if (/^not_/.test(className)) {
        className = className.replace(/^not_/, '');
        invert = true;
      }

      // Get parameters
      params = className.split('_');
      validator = params.shift();

      /* Check if parameters reference elements
      for (j = 0; (param = params[j]); j++) {
        if (['#', '.'].indexOf(param[0]) >= 0) {
          params[j] = param[0] == '#' ? v2.$(param.substring(1)) : v2.$$(param);
        }
      }*/

      if (validator && (validator = v2.$v(validator))) {
        validators.push({ validator: validator,
                          params: params,
                          invert: invert });
      }
    }

    return validators;
  },

  /**
   * Applies an array of validator objects like those created by
   * validatorsFromString to a field
   *
   * @param {Array} validators The validators to apply
   * @param {v2.Field} field   The field to apply validators to
   * @param {String} message   Custom error message for field
   */
  applyValidators: function(validators, field, message) {
    if (!v2.empty(message)) {
      field.setMessage(message);
    }

    for (var i = 0, validator, fv; (validator = validators[i]); i++) {
      fv = field.addValidator(validator.validator, validator.params);
      fv.invert = validator.invert;
    }

    return field;
  }
};

/**
 * Resolves validation markup from a form
 */
v2.html.Form = Base.extend(/** @scope v2.html.prototype */{

  /**
   * Constructs a new validation form, and parses it for validation hooks
   *
   * @param {FormElement} form
   */
  constructor: function(form) {
    this.form = v2.Form.get(form);
    this.__parsed = {};
    this.parseElement(form, this.form);
    this.form.passOnAny(v2.$(form).hasClassName(v2.html.validateAnyClass));
  },

  /**
   * Parses an element and adds validation components to the passed in component
   *
   * @param {Element} container The element to handle
   * @param {Array} collection  The collection to add validators to
   * @param {Array} validators  Option set of validators to add to every field
   *                            found (not added to recursive block elements)
   */
  parseElement: function(container, collection, validators) {
    var elements = v2.$$('div, fieldset, input, select, textarea', container);
    var i, j, validator, fieldValidator, element, tagName, field, fieldValidators;
    this.__parsed[container.id || container.name] = true;
    validators = validators || [];

    // Loop through all elements
    for (i = 0; (element = elements[i]); i++) {
      // Need classes to find validators, skip elements with no classes
      // Input elements may have been bound to a container collection, skip these too
      if (validators.length === 0 &&
          (/^\s*$/.test(element.className) || this.__parsed[element.id || element.name])) {
        continue;
      }

      tagName = element.tagName.toLowerCase();

      // Look for button
      if (tagName === 'input' &&
          v2.Element.hasClassName(element, v2.Form.actionButtonClass)) {
        this.form.addButton(element);
        continue;
      }

      // Process block elements/containers
      if(tagName === 'div' || tagName === 'fieldset') {
        this.parseBlock(element, collection);
        continue;
      }

      fieldValidators = validators.concat(v2.html.validatorsFromString(element.className));

      if (fieldValidators.length > 0) {
        field = new v2.Field(element);

        // Custom error messages may be specified through the title attribute
        // for input/select/textarea elements
        v2.html.applyValidators(fieldValidators, field, element.title);

        this.__parsed[element.id || element.name] = true;

        // Add to collection
        collection.add(field);
      }
    }
  },

  /**
   * Processes a container element and creates a validator collection.
   *
   * The container element can have a class name v2.html.validateAnyClass, or
   * v2.html.validateAllClass, which denotes that only one of the elements in
   * the collection needs to be valid, or that all should be valid.
   *
   * These classes control the behaviour of the collection, and validation may
   * be added to the collection members (input elements or collections in the
   * subtree of the element) in two ways:
   *
   * 1) Normal validation: validators are set up for each input/select/textarea
   *    in the subtree
   * 2) Group validation: validators are set through the class name of the
   *    container. All sub elements will get the same validators (in addition
   *    to any field specific validators)
   *
   * The two ways can be combined.
   *
   * If the container element does not have either of the two aforementioned
   * class names, it is skipped.
   */
  parseBlock: function(element, parentCollection) {
    var collection = new v2.Fieldset(element);
    var passOnAny = true;

    // Augment element
    v2.$(element);

    if (element.hasClassName(v2.html.validateAnyClass)) {
      // passOnAny is true by default
    } else if (element.hasClassName(v2.html.validateAllClass)) {
      passOnAny = false;
    } else {
      return;
    }

    collection.passOnAny(passOnAny);
    var validators = v2.html.validatorsFromString(element.className);
    this.parseElement(element, collection, validators);

    if (!/^\s*$/.test(element.title)) {
      collection.setMessage(element.title);
    }

    if (collection.get(0)) {
      parentCollection.add(collection);
    }
  }
});

/**
 * Finds forms to validate and runs them through v2.Form.addValidationFromHTML
 */
v2.addDOMLoadEvent(function() {
  var forms = document.getElementsByTagName('form');

  for (var i = 0, form; (form = forms[i]); i++) {
    if (v2.Element.hasClassName(form, v2.Form.autoValidateClass)) {
      new v2.html.Form(form);
    }
  }
});

/**
 * Error reporting features as a mixin. Add to components with
 * v2.Object.extend(myKlass, v2.ErrorReporting)
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @version 0.9
 * @license BSD
 */
v2.ErrorReporting = {
  displayErrors: -1,          // How many error messages to display per item
                              // Default is -1 = all messages
  positionErrorsAbove: true,  // Whether to display error messages above item
                              // (true - default) or below (false)
  failureClass: 'error',      // Class name to append to the parent element
                              // when validation fails
  successClass: '',           // Class name to append to the parent element
                              // when validation succeeds
  messagesClass: 'messages',  // Class name used on error lists

  /**
   * Callback that's called when validation on the component fails. If the
   * parent component is a fieldset then the method is immediately aborted.
   */
  onFailure: function() {
    if (this.parent && this.parent.type === 'fieldset') {
      return;
    }

    var parent = this.onSuccess();
    var str = '', i, error, validation, listElement;
    var used = [];
    var messages = this.getMessages();

    parent.addClassName(this.failureClass);
    parent.removeClassName(this.successClass);

    // Set number of errors to display. -1 is all, maximum is all. Abort if 0
    var count = this.displayErrors;
    var max = this.__errors.length;
    count = count < 0 || count > max ? max : count;

    if (count === 0) {
      return;
    }

    var list = document.createElement('ul');
    list.id = this.__getId();
    list.className = this.messagesClass;

    for (i = 0; i < count; i++) {
      error = messages[i];

      // Filter out duplicate error messages
      if (!error || used.indexOf(error.toString()) >= 0) {
        continue;
      }

      used.push(error.toString());
      listElement = document.createElement('li');
      listElement.innerHTML = error.toString();
      list.appendChild(listElement);
    }

    if (this.positionErrorsAbove) {
      parent.insertBefore(list, parent.firstChild);
    } else {
      parent.appendChild(list);
    }
  },

  /**
   * Callback that's called when validation succeeds
   */
  onSuccess: function() {
    if (this.parent && this.parent.type === 'fieldset') {
      return null;
    }

    var parent = v2.$(this.getParent());

    // Remove error if it exists
    var list = v2.$(this.__getId());

    if (list && parent === list.parentNode) {
      parent.removeChild(list);
    }

    parent.removeClassName(this.failureClass);
    parent.addClassName(this.successClass);

    return parent;
  },

  /**
   * Creates an ID string for error lists
   */
  __getId: function() {
    var input = this.element.getElements ? this.element.getElements()[0] : null;
    var parent = input || this.getParent();
    var className = parent.className;

    var value = ((parent.id || parent.name ||
             className.replace(this.failureClass, '')) +
             '_' + this.failureClass).replace(' ', '_').replace(/_+/, '_');

    return value;
  }
};

/**
 * Add error reporting features to field and fieldset types
 */
v2.Object.extend(v2.Field.prototype, v2.ErrorReporting);
v2.Object.extend(v2.Fieldset.prototype, v2.ErrorReporting);

/**
 * Adds error reporting to forms.
 */
v2.Object.extend(v2.Form.prototype, /** @scope v2.Form.prototype */{
  scrollToFirstWhenFail: true, // scrolling to the first field when validation
                               // fails

  /**
   * Scroll to first element with class name containing
   * v2.Field.prototype.failureClass
   */
  onFailure: function() {
    if (!this.scrollToFirstWhenFail) {
      return;
    }

    var i, element, elements, form = this.__form;
    elements = form.all || form.getElementsByTagName('*');

    for (i = 0; (element = elements[i]); i++) {
      if (v2.Element.hasClassName(element, v2.ErrorReporting.failureClass)) {
        v2.Element.scrollTo(element);
        return;
      }
    }
  }
});

