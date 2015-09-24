PIGNOSE-Gallery
===============

> jQuery simple gallery plugin.

![Sample Image](http://www.nhpcw.com/upload/2015-09-20%2B%25EC%2598%25A4%25EC%25A0%2584%2B1-27-26_092015012849.jpg)

Check demo page and enjoy it! [See Demo](http://www.pigno.se/barn/PIGNOSE-Gallery)

----

### Description

- This plugin supports IE8+, Firefox, Chrome, Safari, Opera browser version.
- This plugin needs `jQuery library 1.11.x+`.

### Usage

1. Download or Clone the sources.
2. Import jQuery library from [here](http://jquery.com/download/)
3. Insert snippets like below.

 ```javascript
$(function() {
	$('#visual .gallery').pignoseGallery({
		list: $('#visual .gallery-thumbnails')
	});
});
```
4. Markup structure must be like below.

 ```html
<div id="visual">
	<div class="gallery">
		<img src="[[img src]]" alt="" />
		<img src="[[img src]]" alt="" />
		<img src="[[img src]]" alt="" />
	</div>
	<div class="gallery-thumbnails">
		<a href="#"><img src="[[thumbnail src]]" alt="" /></a>
		<a href="#"><img src="[[thumbnail src]]" alt="" /></a>
		<a href="#"><img src="[[thumbnail src]]" alt="" /></a>
	</div>
</div>
```

### If you have the Bower

1. open a command line and type this

 ```shell
bower install pg-gallery
 ```
 
2. move `assets/js/pignose.gallery.min.js` to your project folder.

### Options
| name | value | default | description |
|------|-------|---------|-------------|
| speed | `number` | 1200 | the millisecond time for speed of the slide animation. |
| interval | `number` | 3000 | the millisecond time for interval of the slide animation. |
| direction | `string` | right | the direction of slide animation. |
| diffTime | `number` | 300 | the millisecond time that you wanna make parallax between main view and sub view. |
| controlAnim | `boolean` | true | if you set this property to false, this plugin will ignore the status of animation queue. |
| pagination | `boolean` | true | if you set this property to true, pagination controller will show. |
| auto | `boolean` | true | if you set this property to true, this slider will start automatically. |
