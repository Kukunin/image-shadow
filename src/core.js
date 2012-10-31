/*!
    image-shadow.js for jQuery v1.6
    (c) 2012 Sergey Kukunin <sergey.kukunin@gmail.com
    GPLv3 license.
*/

(function($) {
	//Init namespace
	$.imageShadow = {};
	(function(_v) {
		_v.v = {
			dataKey : 'image-shadow'
		}

		$.fn.extend({
			imageShadow: function(options) {
				var init = !!options;

				options = $.extend({
					color: "#000",
					blur: 0,
					blurMethod: 'native',
					offsetX : 0,
					offsetY : 0,
					hidden : false,
					imgClass : 'shadowed',
					wrapperClass : 'shadow-wrapper'
				}, options);


				//Multiplexer, that contains the API for several elements
				//And forward call to Context API
				var $multiplexer = {
					"init" : $.proxy(function() {
						$(this).each(function() {
							//Check, if there is Context existing
							if ( $(this).data(_v.v.dataKey) === undefined ) {
								new _v.CanvasContextImpl(this, options).init();
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
