window.jQuery && (function($) {
	//Namespace
	(function(_v) {
		//Context is abstract class to manipulate single IMG
		//Main logic is in subclasses
		_v.Context = function(img, $$) {
			this.$$ = $$;
			this.img = img;
			this.$img = $(img);
		}

		$.each(['init','isActive','show','hide','toggle','destroy'], function(index,value) {
			_v.Context.prototype[value] = function() {
				throw "Method '" + value + "' isn't implemented. Use subclass instead";
			}
		});
	})($.imageShadow);
})(jQuery)
