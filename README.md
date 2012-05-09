Image Shadow
============

Image Shadow is jQuery plugin for creating shadow for transparent (PNG or GIF) images. If you will try to set box-shadow CSS property to img element with transparency, you'll notice square shadow, regardless on image alpha channel. This plugin aims to add this feature.

It based on *Reflection.js* script by *Christophe Beyls* (Plugin skeleton, idea with wrapping).

How it works
------------

*image-shadow.js* uses canvas to create shadow with specified colors, blur radius and offset. It wrap IMG tag into wrapper, and set canvas with shadow before IMG element.

How to use
------------

Simply inject script into your page after jQuery library

   <script src="image-shadow.js" type="text/javascript" charset="utf-8"></script>

and use `$.image_shadow()` function on your selectors. For example:

    $("img").image_shadow({
        color: '#666',
        blur: 20
    });

See `example.html` in `src` folder

Options
---------

Plugin has these options:

- color: Color of shadow. Format is the same, as for CSS properties. *Default*: **#000**;
- blur: Blur radius. *Default*: **0**;
- offsetX: Offset by X-axis. *Default*: **0**;
- offsetY: Offset by Y-axis. *Default*: **0**.

Compability
-----------

Plugin is supported by any modern browser with canvas supporting.

Internet Explorer 6-8 isn't supported, however it is real to make plugin working in future versions.

In Google Chrome 18 bluring works not properly (I don't know why).
