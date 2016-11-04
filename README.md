PIGNOSE-Gallery
===============

> PIGNOSE Gallery is so simple and fast gallery style component.

[![npm version](https://badge.fury.io/js/pg-gallery.svg)](https://badge.fury.io/js/pg-gallery) [![Bower version](https://badge.fury.io/bo/pg-gallery.svg)](https://badge.fury.io/bo/pg-gallery) [![Join the chat at https://gitter.im/KennethanCeyer/PIGNOSE](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/KennethanCeyer/PIGNOSE?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![Screenshot Main](http://www.pigno.se/barn/PIGNOSE-Gallery/demo/img/screenshot_main.png)

Check demo page and enjoy it! [See Demo](http://www.pigno.se/barn/PIGNOSE-Gallery)

----

### Description

- This plugin supports IE8+, Firefox, Chrome, Safari, Opera browser version.
- This plugin needs `jQuery library 1.11.x` higher version.

----

### Usage

1. Download or Clone the sources.
2. Import jQuery library from [here](http://jquery.com/download/)
3. Insert snippets like below.

 ```javascript
$(function() {
	$('.gallery').pignoseGallery({
		thumbnails: '.gallery-thumbnails'
	});
});
```
4. Markup structure must be like below.

 ```html
<div class="gallery">
	<div class="gallery-item"><img src="demo/img/sample0.jpg" alt="" /></div>
	<div class="gallery-item"><img src="demo/img/sample1.jpg" alt="" /></div>
	<div class="gallery-item"><img src="demo/img/sample2.jpg" alt="" /></div>
	<div class="gallery-item"><img src="demo/img/sample3.jpg" alt="" /></div>
	<div class="gallery-item"><img src="demo/img/sample4.jpg" alt="" /></div>

	<div class="gallery-thumbnails">
		<a href="#"><img src="demo/img/sample0.jpg" alt="" /></a>
		<a href="#"><img src="demo/img/sample1.jpg" alt="" /></a>
		<a href="#"><img src="demo/img/sample2.jpg" alt="" /></a>
		<a href="#"><img src="demo/img/sample3.jpg" alt="" /></a>
		<a href="#"><img src="demo/img/sample4.jpg" alt="" /></a>
	</div>
</div>
```

#### If you use Bower

 ```shell
bower install pg-gallery
 ```

#### If you use npm

 ```shell
npm install pg-gallery
 ```
  
Move `dist/pignose.gallery.min.js`, `dist/pignose.gallery.min.css` to your project folder.

----

### Options
| name | value           | default | description |
|------|-----------------|---------|-------------|
| focus | `number` | 0 | You can set first showing image by give index (number type / start from 0). |
| thumbnails | `selector string` | null | Gallery's thumbnails wrapper selctor string. |
| time | `number` | 3000 | Millisecond time of the delay the auto change animation. |
| auto | `boolean` | true | 	If you turn on this option, You can control to pause/play of the gallery by mouseover, and mouseout event. |
| hover | `boolean` | true | If you set this option to true, You can switch images by hover on each of thumbnails. |

----

### Question

If you found something problem of this plugin, or you have some question.

Please send me a message to use either [gitter](https://gitter.im/KennethanCeyer/PIGNOSE) or [Github issue](https://github.com/KennethanCeyer/PIGNOSE-Gallery/issues). (gitter url is on the top of the manual)

