import $ from 'jquery';

$(() => {
  const $scrollDownHump = $('.gallery-hero-block .scroll-down-hump');

  $scrollDownHump.on('click', () => {
    const scrollTop = $scrollDownHump
      .closest('section')
      .next('section')
      .offset().top;

    $('html, body').animate({ scrollTop }, 1000);
  });
});
