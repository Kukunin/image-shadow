/*!
    image-shadow.js for jQuery v1.1
    (c) 2012 Sergey Kukunin <sergey.kukunin@gmail.com
    GPLv3 license.

    Based on Reflection.js by Christophe Beyls (http://www.digitalia.be/software/reflectionjs-for-jquery)
*/

(function($) {

    $.fn.extend({
        imageShadow: function(options) {
            options = $.extend({
                color: "#000",
                blur: 0,
                blurMethod: 'native',
                offsetX : 0,
                offsetY : 0
            }, options);

            //Hardcoded values in one place
            var v = {
                'imgClass' : 'shadowed',
                'wrapperClass' : 'shadow-wrapper',
                'dataKey' : 'shadowed'
            };

            var $shadow = {
                "init" : $.proxy(function() {
                    $(this).each(function() {
                        var img = this,
                            $img = $(img);
                        setTimeout(function() {
                            //If elements ins't IMG tag
                            if ( !/^img$/i.test($img.prop('tagName')) ) { return; }
                            //If already shadowed
                            if ( $img.hasClass(v.imgClass) && $img.parent().hasClass(v.wrapperClass) ) {
                                return;
                            }

                            function doShadow() {
                                var imageWidth = $img.width(),
                                    imageHeight = $img.height();

                                var shadow = $("<canvas />")[0];
                                if (shadow.getContext) {
                                    var context = shadow.getContext("2d");
                                    try {
                                        $(shadow).attr({
                                            width: imageWidth+(options.blur*2),
                                            height: imageHeight+(options.blur*2)
                                        });
                                        context.save();
                                        context.translate(options.blur,options.blur);
                                        context.shadowColor = options.color;
                                        if ( options.blurMethod == 'native' ) {
                                            context.shadowBlur = options.blur;
                                        }

                                        //Make shadow separated from original image
                                        context.shadowOffsetX = imageWidth+options.blur;
                                        context.shadowOffsetY = 0;

                                        //Draw image outside canvas, that shadow will appear on original image place
                                        context.drawImage(img, -imageWidth-options.blur, 0, imageWidth, imageHeight);
                                        context.restore();

                                        if ( options.blurMethod == 'manual' ) {
                                            if ( typeof window.stackBoxBlurCanvasRGBA == "function" ) {
                                                //Dirty hack, to pass canvas into stackBoxBlurCanvasRGBA function
                                                var origin = document.getElementById;
                                                document.getElementById = function() { return shadow; }
                                                stackBoxBlurCanvasRGBA( "canvas", 0, 0, imageWidth+(options.blur*2), imageHeight+(options.blur*2), options.blur, 1 );
                                                document.getElementById = origin;
                                            } else {
                                                throw "StackBoxBlur.js is required for manual blurring. See http://www.quasimondo.com/BoxBlurForCanvas/FastBlur2Demo.html";
                                            }
                                        }
                                    } catch(e) {
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

                                var $wrapper = $(/^a|span$/i.test($img.parent().prop("tagName")) ? "<span />" : "<div />"),
                                    wrapper = $wrapper[0];

                                $wrapper.insertAfter(img).append([img, shadow])

                                wrapper.className = img.className;
                                $wrapper.addClass(v.wrapperClass);

                                $.data(img, v.dataKey, wrapper.style.cssText = img.style.cssText);
                                $wrapper.css({
                                    display: "block",
                                    width: imageWidth,
                                    height: imageHeight,
                                    position: "relative"
                                });
                                img.style.cssText = "display: block; border: 0px; position:relative; z-index:2; ";
                                img.className = v.imgClass;
                            }

                            if (img.complete)
                                doShadow();
                            else
                                $img.load(doShadow);
                        },0);
                    });
                },this),
                "show" : $.proxy(function() {

                },this),
                "hide" : $.proxy(function() {

                },this),
                "unshadow" : $.proxy(function() {
                    return this.unbind("load").each(function() {
                        var img = this,
                            styles = $.data(this, v.dataKey),
                            wrapper;

                        //ToDo more effecient checking
                        if (styles !== undefined) {
                            wrapper = img.parentNode;
                            img.className = wrapper.className;
                            img.style.cssText = styles;
                            $.removeData(img, v.dataKey);
                            wrapper.parentNode.replaceChild(img, wrapper);
                        }
                    });
                },this)
            };
            $shadow.init();

            return $shadow;
        }
    });

})(jQuery);
