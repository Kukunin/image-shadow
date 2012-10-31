/*!
    image-shadow.js for jQuery v1.6
    (c) 2012 Sergey Kukunin <sergey.kukunin@gmail.com
    GPLv3 license.
*/

(function($) {
	//Init namespace
	$.imageShadow = {};
	(function(_v) {
		//Variables
		_v.v = {
			dataKey : 'image-shadow'
		}

		var optimalMethod;

		var chooseOptimalMethod = function() {
			//Choose method
			var methods = [];
			for( var x in _v ) {
				if ( _v[x].prototype && _v[x].prototype.marker == "marker" ) {
					methods.push(x);
				}
			}
			methods.sort(function(a, b) {
				return _v[b].getWeight() - _v[a].getWeight();
			});

			for( var i = 0; i < methods.length; i++ ) {
				if ( _v[methods[i]].isAvailable() ) {
					return methods[i];
				}
			}
			return false;
		}

		$.fn.extend({
			imageShadow: function(options) {

				options = $.extend({
					color: "#000",
					blur: 0,
					blurMethod: 'native',
					offsetX : 0,
					offsetY : 0,
					hidden : false,
					imgClass : 'shadowed',
					wrapperClass : 'shadow-wrapper',
					method : ''
				}, options);

				//Choose optimal implementation
				//One method for all shadows
				if( !optimalMethod )
					optimalMethod = chooseOptimalMethod();

				if( (options.method && _v[options.method]) ) {
					method = options.method;
				} else if ( optimalMethod && _v[optimalMethod] ) {
					method = optimalMethod;
				} else {
					throw "Can't find working method";
				}

				var init = !!options;

				//Multiplexer, that contains the API for several elements
				//And forward call to Method API
				var $multiplexer = {
					"init" : $.proxy(function() {
						$(this).each(function() {
							//Check, if there is Method existing
							if ( $(this).data(_v.v.dataKey) === undefined ) {
								console.log && console.log("Using " + method + " method");
								new _v[optimalMethod](this, options).init();
							}
						});
					},this),
					"isActive" : $.proxy(function() {
						for(var i = 0; i < $(this).length; i++ ) {
							var obj = $(this).eq(i).data(_v.v.dataKey);
							if ( obj && obj.isActive && obj.isActive() ) {
								return true;
							}
						}
						return false;
					},this)
				};
				//Multiplex other similar API calls
				$.each(['destroy','hide','show','toggle'], $.proxy(function(index, value) {
					$multiplexer[value] = $.proxy(function() {
						var args = arguments;
						$(this).each(function() {
							var obj = $(this).data(_v.v.dataKey);
							if ( obj && typeof obj[value] == "function" ) {
								 obj[value](args);
							}
						});
					},this);
				},this));

				if ( init ) {
					$multiplexer.init();
					return this;
				} else {
					return $multiplexer;
				}
			}
		});
	})($.imageShadow);
})(jQuery);
