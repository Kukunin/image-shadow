/**
 * This file describes the Behind Abstract Method
 * It wraps the image and create an element behind it
 * There isn't any logic for creation shadow, only DOM manipulation
 */
window.jQuery && (function($) {
	//Namespace
	(function(_v) {
		_v.BehindMethod = function(img, $$) {
			_v.Method.call(this, img, $$);
		}

		_v.BehindMethod.getWeight = function() {
			return 0;
		}

		_v.BehindMethod.isAvailable = function() {
			return false;
		}

		_v.BehindMethod.prototype = new _v.Method;

		_v.BehindMethod.prototype.init = function() {
			//If elements ins't IMG tag
			if ( !/^img$/i.test(this.$img.prop('tagName')) ) { return; }
			//If already shadowed
			if ( this.isActive() ) { return; }

			var doShadow = $.proxy(function() {
				var imageWidth = this.$img.width(),
					imageHeight = this.$img.height();

				this.shadow = this.createShadow();

				this.makeShadow();

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

		_v.BehindMethod.prototype.isActive = function() {
			return this.$img.hasClass(this.$$.imgClass) && this.$img.parent().hasClass(this.$$.wrapperClass);
		}

		_v.BehindMethod.prototype.show = function() {
			this.$wrapper.addClass("show").removeClass("hide");
			$(this.shadow).show();
		}

		_v.BehindMethod.prototype.hide = function() {
			this.$wrapper.addClass("hide").removeClass("show");
			$(this.shadow).hide();
		}

		_v.BehindMethod.prototype.toggle = function() {
			this.$wrapper.toggleClass("hide").toggleClass("show");
			$(this.shadow).toggle();
		}

		_v.BehindMethod.prototype.destroy = function() {
			if ( this.isActive() ) {
				this.img.className = this.wrapper.className;
				this.img.style.cssText = this.cssText;
				this.$wrapper.replaceWith( this.img );
				this.$img.removeData(_v.v.dataKey);
			}
		}
	})($.imageShadow);
})(jQuery)
