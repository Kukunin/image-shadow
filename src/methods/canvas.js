/**
 * This method uses Canvas and drawImage to make the blurred shadow
 */
window.jQuery && (function($) {
	//Namespace
	(function(_v) {
		_v.CanvasMethod = function(img, $$) {
			_v.BehindMethod.call(this, img, $$);
		}

		_v.CanvasMethod.getWeight = function() {
			return 10;
		}

		_v.CanvasMethod.isAvailable = function() {
			return !!window.HTMLCanvasElement && !!window.CanvasRenderingContext2D;
		}

		_v.CanvasMethod.prototype = new _v.BehindMethod;

		_v.CanvasMethod.prototype.createShadow = function() {
			return $("<canvas/>")[0];
		}

		_v.CanvasMethod.prototype.makeShadow = function() {
				var context = this.shadow.getContext("2d"),
					imageWidth = this.$img.width(),
					imageHeight = this.$img.height();

				$(this.shadow).attr({
					width: imageWidth+(this.$$.blur*2),
					height: imageHeight+(this.$$.blur*2)
				});

				context.save();
				context.translate(this.$$.blur,this.$$.blur);
				context.shadowColor = this.$$.color;
				if ( this.$$.blurMethod == 'native' ) {
					context.shadowBlur = this.$$.blur;
				}

				//Make shadow separated from original image
				context.shadowOffsetX = imageWidth+this.$$.blur;
				context.shadowOffsetY = 0;

				//Draw image outside canvas, that shadow will appear on original image place
				context.drawImage(this.img, -imageWidth-this.$$.blur, 0, imageWidth, imageHeight);
				context.restore();

				if ( this.$$.blurMethod == 'manual' ) {
					if ( typeof window.stackBoxBlurCanvasRGBA == "function" ) {
						//Dirty hack, to pass canvas into stackBoxBlurCanvasRGBA function
						var origin = document.getElementById;
						document.getElementById = $.proxy(function() { return this.shadow; },this);
						stackBoxBlurCanvasRGBA( "canvas", 0, 0, imageWidth+(this.$$.blur*2), imageHeight+(this.$$.blur*2), this.$$.blur, 1 );
						document.getElementById = origin;
					} else {
						throw "StackBoxBlur.js is required for manual blurring. See http://www.quasimondo.com/BoxBlurForCanvas/FastBlur2Demo.html";
					}
				}
		}

	})($.imageShadow);
})(jQuery)
