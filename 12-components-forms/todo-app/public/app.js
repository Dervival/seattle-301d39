'use strict';

$('li').on('dblclick', function() {
  $(this).find('form').toggleClass('active');
});
