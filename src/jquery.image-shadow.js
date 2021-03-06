/*!
    image-shadow.js for jQuery v1.1
    (c) 2012 Sergey Kukunin <sergey.kukunin@gmail.com
    GPLv3 license.

    Based on Reflection.js by Christophe Beyls (http://www.digitalia.be/software/reflectionjs-for-jquery)
*/

(function($) {

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
                wrapperClass : 'shadow-wrapper',
                onComplete : $.noop
            }, options);

            var v = {
                dataKey : 'image-shadow'
            }


            //Context for the one instance of IMG
            //Main logic is here
            var Context = function(img, $$) {
                this.$$ = $$;
                this.img = img;
                this.$img = $(img);
            }

            Context.prototype.init = function() {
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
                    } else {
                        //ToDo MSIE Supporting
                        return;
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

                    this.original = {};
                    this.original.className = this.wrapper.className = this.img.className;
                    this.original.cssText = this.wrapper.style.cssText = this.img.style.cssText;
                    this.$wrapper.addClass(this.$$.wrapperClass);


                    this.$wrapper.css({
                        display: "block",
                        width: imageWidth,
                        height: imageHeight
                    });
                    if ( !this.$wrapper.css("position") || this.$wrapper.css("position") == "static" ) {
                        this.$wrapper.css("position","relative");
                    }

                    this.img.style.cssText = "display: block; border: 0px; position:relative; z-index:2; ";
                    this.img.className = this.$$.imgClass;

                    this.$img.data(v.dataKey, this);

                    this.$$.hidden ? this.hide() : this.show();

                    this.$$.onComplete(this);
                }, this);

                if (this.img.complete)
                    doShadow();
                else
                    this.$img.load(doShadow);
            };

            Context.prototype.isActive = function() {
                return this.$img.hasClass(this.$$.imgClass) && this.$img.parent().hasClass(this.$$.wrapperClass);
            }

            Context.prototype.show = function() {
                this.$wrapper.addClass("show").removeClass("hide");
                $(this.shadow).show();
            }

            Context.prototype.hide = function() {
                this.$wrapper.addClass("hide").removeClass("show");
                $(this.shadow).hide();
            }

            Context.prototype.toggle = function() {
                this.$wrapper.toggleClass("hide").toggleClass("show");
                $(this.shadow).toggle();
            }

            Context.prototype.destroy = function() {
                if ( this.isActive() ) {
                    this.img.className = this.original.className;
                    this.img.style.cssText = this.original.cssText;
                    this.$wrapper.replaceWith( this.img );
                    this.$img.removeData(v.dataKey);
                }
            }

            //Multiplexer, that contains the API for several elements
            //And forward call to Context API
            var $multiplexer = {
                "init" : $.proxy(function() {
                    $(this).each(function() {
                        //Check, if there is Context existing
                        if ( $(this).data(v.dataKey) === undefined ) {
                            new Context(this, options).init();
                        }
                    });
                },this),
                "isActive" : $.proxy(function() {
                    for(var i = 0; i < $(this).length; i++ ) {
                        var obj = $(this).eq(i).data(v.dataKey);
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
                        var obj = $(this).data(v.dataKey);
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

})(jQuery);
