import './styles.scss';
import $ from 'jquery';

const resizeHandler = () => {
  const $col = $('.cover-image-col');
  const $img = $col.find('img');

  const colPadding = $col.css('paddingLeft').match(/(\d+)px/)[1];

  $col.removeClass('thin');

  // If window is not wide enough to fit the image, swap to width: 100%
  if ($(window).width() < $img.width() + colPadding * 2) {
    $col.addClass('thin');
  }
};

$(() => {
  $(window).resize(resizeHandler);
  resizeHandler();
});
