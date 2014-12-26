/****************************************
*
*  - PIGNOSE Gallery JS
*  - DATE    2014-12-26
*  - AUTHOR  PIGNOSE(http://pigno.se)
*  - VERSION 0.0.2
*  - LICENCE MIT
*
****************************************/

(function($) {
	// Plugin common configuration.
	var _config = {
		name:       'PIGNOSE Gallery JS',
		createDate: '2014-12-26',
		updateDate: '2014-12-26',
		version:    '0.0.2',
		author:     'kenneth ceyer',
		email:      'kennethan@nhpcw.com',
		dev:        {
			id: 'pignose_gallery',
			handler: '.pignoseGalleryHandler'
		},
		plugin:     {
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
				lists: null,
				lineWidth: 3,
				lineColor: '#d81208',
				time: 2400,
				animTime: 300,
				auto: true,
				hover: true
			}, options), $this = this;
			return $this.each(function() {
				var $this = $(this);
				_config.plugin.object = $this;
				_config.plugin.views  = $this.children();
				_interface._save();
				_interface._excute(_interface.render, opt);
			});
		},
		render: function(opt) {
			if(typeof opt.lists !== 'undefined' && opt.lists !== null) {
				var $this = $(this);
				_interface._load($this);
				_config.plugin.lists = opt.lists.find('> * > a').each(function(i, e) {
					var $this = $(this);
					var $border_content = $('<span class="pignose_border">&nbsp;</span>');
					$this.css({
						position: 'relative'
					});
					$border_content.css({
						display:  'none',
						position: 'absolute',
						top:      0,
						left:     0,
						width:    $this.width() - opt.lineWidth * 2,
						height:   $this.height() - opt.lineWidth * 2,
						border:   opt.lineWidth + 'px solid ' + opt.lineColor
					});
					if(i == _config.plugin.index) {
						$border_content.css('display', 'block');
					}
					$border_content.appendTo($this);
				});
				_config.plugin.max   = opt.lists.children().length;
				_config.plugin.index = ((opt.focus + 1) > _config.plugin.max)? (_config.plugin.max - 1):opt.focus;
				$this.eq(_config.plugin.index).siblings().hide();
				_interface._save();
				_interface._excute(_interface.process, opt);
			}
		},
		process: function(opt) {
			var $this = $(this), _t;
			_interface._load($this);
			if(opt.auto === true) {
				_interface._bind($this.add(_config.plugin.lists), 'mouseover', function() {
					try {
						clearInterval(_t);
					}
					catch (e) { ; }
				});
				_interface._bind($this.add(_config.plugin.lists), 'mouseout', function() {
					try {
						clearInterval(_t);
					}
					catch (e) { ; }
					_t = setInterval(function() {
						_interface._load($this);
						_config.plugin.index = (_config.plugin.index + 1) % _config.plugin.max;
						_config.plugin.lists.find('.pignose_border:visible').hide();
						_config.plugin.lists.eq(_config.plugin.index).children('.pignose_border').show();
						(_config.plugin.views.eq(_config.plugin.index) || _config.plugin.views.eq(0)).show().siblings().hide();
						_interface._save();
					}, opt.time);
				}, true);
			}
			if(opt.hover) {
				_interface._bind(_config.plugin.lists, 'mouseover', function() {
					var $this = $(this);
					_config.plugin.index = $this.parent().index();
					_config.plugin.lists.find('.pignose_border:visible').hide();
					_config.plugin.lists.eq(_config.plugin.index).children('.pignose_border').show();
					(_config.plugin.views.eq(_config.plugin.index) || _config.plugin.views.eq(0)).show().siblings().hide();
					_interface._save();
				});
			}
			_interface._bind(_config.plugin.lists, 'click', function(event) {
				if(opt.hover !== true) {
					var $this = $(this);
					_config.plugin.index = $this.parent().index();
					_config.plugin.lists.find('.pignose_border:visible').hide();
					_config.plugin.lists.eq(_config.plugin.index).children('.pignose_border').show();
					(_config.plugin.views.eq(_config.plugin.index) || _config.plugin.views.eq(0)).show().siblings().hide();
					_interface._save();
				}
				event.preventDefault();
			});
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