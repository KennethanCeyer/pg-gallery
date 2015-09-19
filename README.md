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

### Options
| name | value | default | description |
|------|-------|---------|-------------|
| focus | `number` | 0 | initial index of focused image. |
| list | `jQuery object` | null | the gallery thumbnails for gallery views. |
| lineWidth | `number` | 3 | line width for focus style. |
| lineColor | `string` | #d81208 | line color for focus style. |
| time | `number` | 2400 | the millisecond time for change to animation. |
| auto | `boolean` | true | if this property is on, you can pause/play to change the gallery by mouseover or mosueout. |
| hover | `boolean` | true | if this property is on, you can control them by mouseover on thumbnails. |
