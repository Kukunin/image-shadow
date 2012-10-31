window.jQuery && (function($) {
	//Namespace
	(function(_v) {
		_v.CanvasMethod = function(img, $$) {
			_v.Method.call(this, img, $$);
		}

		_v.CanvasMethod.getWeight = function() {
			return 10;
		}

		_v.CanvasMethod.isAvailable = function() {
			return !!window.HTMLCanvasElement && !!window.CanvasRenderingContext2D;
		}

		_v.CanvasMethod.prototype = new _v.Method;

		_v.CanvasMethod.prototype.init = function() {
			//If elements ins't IMG tag
			if ( !/^img$/i.test(this.$img.prop('tagName')) ) { return; }
			//If already shadowed
			if ( this.isActive() ) { return; }

			var doShadow = $.proxy(function() {
				var imageWidth = this.$img.width(),
					imageHeight = this.$img.height();

				this.shadow = $("<canvas />")[0];
				if (this.shadow.getContext) {
					var context = this.shadow.getContext("2d");
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
				$(this.shadow).css({
					display: "block",
					border: 0,
					position: "absolute",
					top: this.$$.offsetY - this.$$.blur,
					left: this.$$.offsetX - this.$$.blur
				});

				this.$wrapper = $(/^a|span$/i.test(this.$img.parent().prop("tagName")) ? "<span />" : "<div />");
				this.wrapper = this.$wrapper[0];

				this.$wrapper.insertAfter(this.img).append([this.img, this.shadow])

				this.wrapper.className = this.img.className;
				this.$wrapper.addClass(this.$$.wrapperClass);

				this.cssText = this.wrapper.style.cssText = this.img.style.cssText;

				this.$wrapper.css({
					display: "block",
					width: imageWidth,
					height: imageHeight,
					position: "relative"
				});
				this.img.style.cssText = "display: block; border: 0px; position:relative; z-index:2; ";
				this.img.className = this.$$.imgClass;

				this.$img.data(_v.v.dataKey, this);

				this.$$.hidden ? this.hide() : this.show();
			}, this);

			if (this.img.complete)
				doShadow();
			else
				this.$img.load(doShadow);
		};

		_v.CanvasMethod.prototype.isActive = function() {
			return this.$img.hasClass(this.$$.imgClass) && this.$img.parent().hasClass(this.$$.wrapperClass);
		}

		_v.CanvasMethod.prototype.show = function() {
			this.$wrapper.addClass("show").removeClass("hide");
			$(this.shadow).show();
		}

		_v.CanvasMethod.prototype.hide = function() {
			this.$wrapper.addClass("hide").removeClass("show");
			$(this.shadow).hide();
		}

		_v.CanvasMethod.prototype.toggle = function() {
			this.$wrapper.toggleClass("hide").toggleClass("show");
			$(this.shadow).toggle();
		}

		_v.CanvasMethod.prototype.destroy = function() {
			if ( this.isActive() ) {
				this.img.className = this.wrapper.className;
				this.img.style.cssText = this.cssText;
				this.$wrapper.replaceWith( this.img );
				this.$img.removeData(_v.v.dataKey);
			}
		}
	})($.imageShadow);
})(jQuery)
