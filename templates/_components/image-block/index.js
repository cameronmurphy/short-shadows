import $ from 'jquery';
import './styles.scss';

const resizeHandler = () => {
  const $block = $('.image-block');
  const $col = $block.find('.col');
  const $img = $col.find('img');

  const colPadding = $col.css('paddingLeft').match(/(\d+)px/)[1];

  $block.removeClass('thin');

  // If window is not wide enough to fit the image, swap to width: 100%
  if ($(window).width() < $img.width() + colPadding * 2) {
    $block.addClass('thin');
  }
};

$(() => {
  $(window).resize(resizeHandler);
  resizeHandler();
});
