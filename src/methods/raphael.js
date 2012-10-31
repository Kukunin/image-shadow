/**
 * This method uses Raphael.js to create the shadow
 */
window.jQuery && (function($) {
	//Namespace
	(function(_v) {
		_v.RaphaelMethod = function(img, $$) {
			_v.BehindMethod.call(this, img, $$);
		}

		_v.RaphaelMethod.getWeight = function() {
			return 2;
		}

		_v.RaphaelMethod.isAvailable = function() {
			return !!window.Raphael;
		}

		_v.RaphaelMethod.prototype = new _v.BehindMethod;

		_v.RaphaelMethod.prototype.createShadow = function() {
            return $("<div/>")[0];
		}

		_v.RaphaelMethod.prototype.makeShadow = function() {
            var raphael = Raphael(this.shadow,totalWidth,totalHeight),
                imageWidth = this.$img.width(),
                imageHeight = this.$img.height(),
                totalWidth = imageWidth + ( this.$$.blur*2),
                totalHeight = imageHeight + ( this.$$.blur*2);

            var image = raphael.image(this.$img.prop('src'),-imageWidth,0,imageWidth,imageHeight);
            image.glow({
                width: 0,
                offsetx : imageWidth + this.$$.blur,
                offsety : this.$$.blur,
                color : this.$$.color,
                opacity : this.$$.opacity,
                fill : true
            });
		}

	})($.imageShadow);
})(jQuery)
