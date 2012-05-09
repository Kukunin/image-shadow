/*!
	image-shadow.js for jQuery v1.1
	(c) 2012 Sergey Kukunin <sergey.kukunin@gmail.com
	GPLv3 license.

    Based on Reflection.js by Christophe Beyls (http://www.digitalia.be/software/reflectionjs-for-jquery)
*/

(function($) {

$.fn.extend({
	image_shadow: function(options) {
		options = $.extend({
            color: "#fff",
            blur: 0,
            offsetX : 0,
            offsetY : 0
		}, options);

		return this.unshadow().each(function() {
			var img = this;
			if (/^img$/i.test(img.tagName)) {
				function doShadow() {
					var imageWidth = img.width,
                        imageHeight = img.height,
                        shadow,
                        wrapper,
                        context,
                        gradient;

					shadow = $("<canvas />")[0];
					if (shadow.getContext) {
						context = shadow.getContext("2d");
						try {
							$(shadow).attr({
                                width: imageWidth+(options.blur*2),
                                height: imageHeight+(options.blur*2)
                            });
                            context.save();
                            context.translate(options.blur,options.blur);
                            context.shadowColor = options.color;
                            context.shadowBlur = options.blur;

                            //Make shadow separated from original image
                            context.shadowOffsetX = imageWidth+options.blur;
                            context.shadowOffsetY = 0;

                            //Draw image outside canvas, that shadow will appear on original image place
							context.drawImage(img, -imageWidth-options.blur, 0, imageWidth, imageHeight);
                            context.restore();
						} catch(e) {
                            console.log(e);
							return;
						}
					} else {
                        //ToDo MSIE Supporting
                        return;
					}
					$(shadow).css({
                        display: "block",
                        border: 0,
                        position: "absolute",
                        top: options.offsetY - options.blur,
                        left: options.offsetX - options.blur
                    });

					wrapper = $(/^a|span$/i.test(img.parentNode.tagName) ? "<span />" : "<div />").insertAfter(img).append([img, shadow])[0];
					wrapper.className = img.className;
					$.data(img, "shadowed", wrapper.style.cssText = img.style.cssText);
					$(wrapper).css({
                        display: "block",
                        width: imageWidth,
                        height: imageHeight,
                        position: "relative"
                    });
					img.style.cssText = "display: block; border: 0px; position:relative; z-index:2; ";
					img.className = "shadowed";
				}

				if (img.complete) doShadow();
				else $(img).load(doShadow);
			}
		});
	},

	unshadow: function() {
		return this.unbind("load").each(function() {
			var img = this, shadowed = $.data(this, "shadowed"), wrapper;

			if (shadowed !== undefined) {
				wrapper = img.parentNode;
				img.className = wrapper.className;
				img.style.cssText = shadowed;
				$.removeData(img, "shadowed");
				wrapper.parentNode.replaceChild(img, wrapper);
			}
		});
	}
});

})(jQuery);
