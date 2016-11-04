/************************************************************************
*
*  [ PIGNOSE Gallery ]
*  @ DATE    2016-11-05
*  @ AUTHOR  PIGNOSE(https://www.github.com/KennethanCeyer)
*  @ LICENCE MIT
*
************************************************************************/

(function($) {
	'use strict';
	/**********************************************************
	 *
	 * [ START PLUGIN SETTINGS ]
	 * 
	 * @ This plugin structure was made since 2014
	 *
	 *********************************************************/
	var _config = {
		name: 'PIGNOSE Gallery JS',
		dev:        {
			id: 'pignose_gallery',
			handler: '.pignoseGalleryHandler'
		},
		plugin: {
			index: 0
		}
	};

	// Abstract OOP plugin struct.
	var _interface = {
		_throw: function(error, errno) {
			$.error("'" + _config.name + "' load failed (" + errno + "): " + error);
		},
		_bind: function(object, handler, func, iife) {
			var _handler = handler.replace(/(\w+(?=\s)?)/gi, '$1' + _config.dev.handler), niife = niife || false;
			object.unbind(_handler).bind(_handler, func);
			if(!!iife === true) {
				object.triggerHandler(_handler);
			}
			return object;
		},
		_unbind: function(object, handler) {
			var _handler = handler.replace(/(\w+(?=\s)?)/gi, '$1' + _config.dev.handler), niife = niife || false;
			object.unbind(_handler);
		},
		_trigger: function(object, handler) {
			var _handler = handler.replace(/(\w+(?=\s)?)/gi, '$1' + _config.dev.handler);
			object.triggerHandler(_handler);
		},
		_excute: function(func) {
			if(typeof func === 'function' && func != null) {
				func.apply(_config.plugin.object, Array.prototype.slice.call(arguments, 1));
			}
		},
		_extend: function(object, func) {
			var _args = arguments;
			if(typeof object === 'object' && object != null) {
				object[func] = function() {
					_interface[func].apply(this, Array.prototype.slice.call(_args, 2));
				};
			}
		},
		_save: function(object) {
			var object = object || _config.plugin.object;
			if (object.length > 0) {
				object[0][_config.dev.id] = _config.plugin;
				return _config.plugin;
			}
		},
		_load: function(object) {
			var object = object || _config.plugin.object;
			if (object.length > 0) {
				_config.plugin = object[0][_config.dev.id];
				return _config.plugin;
			}
		},
		// Define contruction method.
		init: function(options) {
			var opt = $.extend({
				focus: 0,
				thumbnails: null,
				time: 3000,
				auto: true,
				hover: true
			}, options), $this = this;
			return $this.each(function() {
				var $this = $(this);
				_config.plugin.object = $this.addClass('pignose-gallery');
				_config.plugin.views  = $this.find('.gallery-item').addClass('pignose-gallery-item');
				_interface._save();
				_interface._excute(_interface.render, opt);
			});
		},
		render: function(opt) {
			if(typeof opt.thumbnails !== 'undefined' && opt.thumbnails !== null) {
				var $this = $(this);
				_interface._load($this);
				_config.plugin.list = $this.find(opt.thumbnails).addClass('pignose-gallery-thumbnails').find('a').addClass('pignose-gallery-thumbnails-item').each(function(i, e) {
					var $this = $(this);
					var $border = $('<span class="pignose-gallery-border">&nbsp;</span>');
					$border.appendTo($this);
				});
				_config.plugin.max   = _config.plugin.list.children().length;
				_config.plugin.index = ((opt.focus + 1) > _config.plugin.max)? (_config.plugin.max - 1):opt.focus;
				_interface._save();
				_interface._excute(_interface.process, opt);
			}
		},
		process: function(opt) {
			var $this = $(this), _t = null, _p = null;
			var change = function() {
				_config.plugin.list.find('.pignose-gallery-border.active').removeClass('active');
				_config.plugin.list.eq(_config.plugin.index).children('.pignose-gallery-border').addClass('active');
				var $target = (_config.plugin.views.eq(_config.plugin.index) || _config.plugin.views.eq(0)).each(function() {
					var $this = $(this);
					$this.addClass('anim-start');
					setTimeout(function() {
						$this.addClass('active')
					}, 25);
				}).siblings('.pignose-gallery-item').removeClass('active');
				try {
					if(_p !== null) {
						clearTimeout(_p);
					}
				} catch(e) { ; }
				_p = setTimeout(function() {
					$target.removeClass('anim-start');
				}, 300);
				_interface._save();
			};

			_interface._load($this);
			if(opt.auto === true) {
				_interface._bind($this.add(_config.plugin.list), 'mouseover', function() {
					try {
						clearInterval(_t);
					}
					catch (e) { ; }
				});
				_interface._bind($this.add(_config.plugin.list), 'mouseout', function() {
					try {
						clearInterval(_t);
					}
					catch (e) { ; }
					_t = setInterval(function() {
						_interface._load($this);
						_config.plugin.index = (_config.plugin.index + 1) % _config.plugin.max;
						change.call();
					}, opt.time);
				}, true);
			}
			if(opt.hover === true) {
				_interface._bind(_config.plugin.list, 'mouseover', function() {
					var $this = $(this);
					_config.plugin.index = $this.index();
					change.call();
				});
			}

			_interface._bind(_config.plugin.list, 'click', function(event) {
				event.preventDefault();
				var $this = $(this);
				_config.plugin.index = $this.index();
				change.call();
			});

			_interface._trigger(_config.plugin.list.eq(_config.plugin.index), 'click');
		}
	}

	// jQuery controller layer.
	$.fn.pignoseGallery = function(options) {
		var ERROR_FLAG = 0x01;

		if(typeof _interface[options] === 'function') {
			return _interface[options].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if(typeof options === 'object' || !options) {
			return _interface.init.apply(this, arguments);
		}
		else {
			// Throws error exception.
			_interface._throw('an error has occurred in initialization.', 0);
			return ERROR_FLAG;
		}
	};
})(jQuery);