window.jQuery && (function($) {
	//Namespace
	(function(_v) {
		//Method is abstract class to manipulate single IMG
		//Main logic is in subclasses
		_v.Method = function(img, $$) {
			this.$$ = $$;
			this.img = img;
			this.$img = $(img);
			//All subclasses will have the subclass.prototype.marker
			this.marker = "marker";
		}

		$.each(['init','isActive','show','hide','toggle','destroy'], function(index,value) {
			_v.Method.prototype[value] = function() {
				throw "Method '" + value + "' isn't implemented";
			}
		});
	})($.imageShadow);
})(jQuery)
