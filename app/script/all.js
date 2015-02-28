(function ($, window, document, undefined) {

  $(function() {
    var _box = $('.box'),
        _boxSize = _box.width(),
        _mask = $('.mask'),
        _dot = $('.dot'),
        _color = {
          'h': 0,
          's': 0,
          'l': '50%'
        };

    var calcColor = function (e) {
      var _x = e.offsetX,
         _y = e.offsetY;

      _dot.css({
        'left': _x,
        'top': _y
      });

      _color.h = Math.round(_x * 255 / _boxSize);
      _color.s = 100 - Math.round(_y * 100 / _boxSize);

      _box.css({
        'backgroundColor': 'hsl('+ _color.h +','+ _color.s +'%,50%)'
      });
    };

    _mask.on({
      'mouseenter.cc': function() {
        _mask.on({
          'mousemove.cc': calcColor
        });
      },
      'click.cc, mouseleave': function () {
        console.log('ccc');
        _mask.off('mousemove.cc');
      }
    });
  });

})(jQuery, window, document);
