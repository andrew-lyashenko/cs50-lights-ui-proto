jQuery(function ($) {

  var bits          = 8;
  var maxNum        = Math.pow(2, bits);
  var minNum        = 0;
  var $lightsHolder = $('#lights')
  var $numHolder    = $('#num');
  var $incButton    = $('#inc');
  var $decButton    = $('#dec');
  var $gameButton   = $('#game');
  var $lights       = null;
  var gameMode      = 0;

  for (var i = bits; i--;) {
    $('<button/>').html(Math.pow(2, i)).appendTo($lightsHolder);
  }

  $lights = $lightsHolder.children();

  function getRandomNum() {
    return Math.floor(Math.random() * (maxNum - 1)) + 1;
  }

  var bin2dec = function () {
    var lBits, num;
    $(this).toggleClass('active');

    lBits = $lights.map(function () {
      return + $(this).hasClass('active');
    })
    lBits = lBits.get().join('');
    num = ConvertBase.bin2dec(lBits);

    if (!gameMode) {
      $numHolder.html(num);
    }

    if (gameMode == num) {
      $lights
        .prop('disable', true)
        .filter('.active')
        .addClass('highlight');
    }
  };

  var dec2bin = function () {
    var num = parseInt($numHolder.html(), 10);
    var lBits;

    switch (this.id) {
      case 'inc': num++; break;
      case 'dec': num--; break;
    }

    if (num >= minNum && num < maxNum) {
      $lights.removeClass('active');
      $numHolder.html(num);
      lBits = ConvertBase.dec2bin(num).split('').reverse();
      lBits.forEach(function (bitValue, bitIndex) {
        var lightIndex = bits - bitIndex - 1;
        if (bitValue === '1') {
          $lights.eq(lightIndex).addClass('active');
        }
      });
    }
  };

  $incButton.on('click', dec2bin);
  $decButton.on('click', dec2bin);
  $lightsHolder.on('click', 'button', bin2dec);

  $gameButton.on('click', function () {
    $incButton.prop('disabled', !gameMode);
    $decButton.prop('disabled', !gameMode);
    $lights.removeClass('active highlight');
    if (!gameMode) {
      $gameButton.html('Disable Game Mode');
      gameMode = getRandomNum();
    } else {
      $gameButton.html('Game Mode');
      gameMode = 0;
    }
    $numHolder.html(gameMode);
  });

});