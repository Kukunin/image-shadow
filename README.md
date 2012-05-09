Image Shadow
============

Image Shadow is jQuery plugin for creating shadow before PNG images. If you will try to set box-shadow CSS property to PNG img tag, you'll notice square tag, regardless on PNG alpha channel. This plugin aims to add this feature.

It based on Reflection.js script by Christophe Beyls.

How it works
============

image-shadow.js uses canvas to create shadow with specified colors, blur radius and offset. It wrap IMG tag into wrapper, and set canvas with shadow before IMG tag.

How to use
===========

Simply inject script into your page after jQuery library

   <script src="image-shadow.js" type="text/javascript" charset="utf-8"></script>

and use `image_shadow()` function on your selectors. For example:

    $("img").image_shadow({
        color: '#666',
        blur: 20
    });

Options
=========

Plugin has these options:

- color: Color of shadow. Format is the same, as for CSS properties. *Default*: **#000**;
- blur: Blur radius. *Default*: **0**
- offsetX: Offset by X-axis. *Default*: **0**
- offsetY: Offset by Y-axis. *Default*: **0**
