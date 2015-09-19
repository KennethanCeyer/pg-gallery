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
				list: null,
				lineWidth: 3,
				lineColor: '#d81208',
				time: 2400,
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
			if(typeof opt.list !== 'undefined' && opt.list !== null) {
				var $this = $(this);
				_interface._load($this);
				_config.plugin.list = opt.list.find('a').each(function(i, e) {
					var $this = $(this);
					var $border_content = $('<span class="pignose_border">&nbsp;</span>');
					$this.css({
						position: 'relative',
						display: 'inline-block'
					});
					$border_content.css({
						display:  'none',
						position: 'absolute',
						top:      0,
						left:     0,
						width:    '100%',
						height:   '100%',
						border:   opt.lineWidth + 'px solid ' + opt.lineColor,
						boxSizing: 'border-box'
					});
					if(i == _config.plugin.index) {
						$border_content.css('display', 'block');
					}
					$border_content.appendTo($this);
				});
				_config.plugin.max   = opt.list.children().length;
				_config.plugin.index = ((opt.focus + 1) > _config.plugin.max)? (_config.plugin.max - 1):opt.focus;
				_interface._save();
				_interface._excute(_interface.process, opt);
			}
		},
		process: function(opt) {
			var $this = $(this), _t;
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
						_config.plugin.list.find('.pignose_border:visible').hide();
						_config.plugin.list.eq(_config.plugin.index).children('.pignose_border').show();
						(_config.plugin.views.eq(_config.plugin.index) || _config.plugin.views.eq(0)).show().siblings().hide();
						_interface._save();
					}, opt.time);
				}, true);
			}
			if(opt.hover) {
				_interface._bind(_config.plugin.list, 'mouseover', function() {
					var $this = $(this);
					_config.plugin.index = $this.index();
					_config.plugin.list.find('.pignose_border:visible').hide();
					_config.plugin.list.eq(_config.plugin.index).children('.pignose_border').show();
					(_config.plugin.views.eq(_config.plugin.index) || _config.plugin.views.eq(0)).show().siblings().hide();
					_interface._save();
				});
			}
			_interface._bind(_config.plugin.list, 'click', function(event) {
				if(opt.hover !== true) {
					var $this = $(this);
					_config.plugin.index = $this.index();
					_config.plugin.list.find('.pignose_border:visible').hide();
					_config.plugin.list.eq(_config.plugin.index).children('.pignose_border').show();
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