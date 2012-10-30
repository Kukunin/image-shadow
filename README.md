Image Shadow
============

Image Shadow is jQuery plugin for creating shadow for transparent (PNG or GIF) images. If you will try to set box-shadow CSS property to img element with transparency, you'll notice square shadow, regardless on image alpha channel. This plugin aims to add this feature.

How it works
------------

*.jquery.image-shadow.js* uses Raphael.js library to make the shadow behind image.

**WARNING** Due the limitation of the Raphael.js, this method isn't working. You'll receive the same square shadow, as with the simple `box-shadow` CSS3 rule.

This code is live with the hope, Raphael.js will implement glowing for image objects.

DEMO
------------

You can find the simple demo of plugin here: http://htmlpreview.github.com/?https://raw.github.com/Kukunin/image-shadow/master/src/example.html

See `example.html` in `src` folder

How to use
------------

Simply inject script into your page after jQuery library

   <script src="jquery.image-shadow.js" type="text/javascript" charset="utf-8"></script>

and use `$.imageShadow()` function on your selectors. For example:

    $("img").imageShadow({
        color: '#666',
        blur: 20
    });

Please note, that, even if you haven't the options, pass the empty object {} as argument.
If there isn't any argument, you'll receive the API object instead for initialization.

Options
---------

Plugin has these options:

- blur: Blur radius. *Default*: **0**;
- color: Color of the shadow. *Default*: **black**;
- opacity: Opacity of the shadow. *Default*: **0.5**;
- offsetX: Offset by X-axis. *Default*: **0**;
- offsetY: Offset by Y-axis. *Default*: **0**;
- hidden: Whether is shadow is hidden by default. *Default*: **false**;
- imgClass: Class of the IMG element. *Default*: **shadowed**;
- wrapperClass: Class of the IMG wrapper. *Default*: **shadow-wrapper**;

API
-----------

Plugin support basic API calls. `$.imageShadow()` returns the object with API calls. For example, to remove all shadows, use:

   $("img").imageShadow().destroy();

Currently, the further API calls are supported:

- **isActive**: Check whether images already have the shadow or not. Returns `true`, if at least one image has shadow;
- **destroy**: Remove shadow and revert all to the original state;
- **show**: Show shadow;
- **hide**: Hide shadow;
- **toggle**: Toggle shadow;

Compability
-----------

Plugins is supported by all browsers, which supports Raphael.js.

From the official site:

*Raphaël currently supports Firefox 3.0+, Safari 3.0+, Chrome 5.0+, Opera 9.5+ and Internet Explorer 6.0+.*
