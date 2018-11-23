import $ from 'jquery';
import 'jssorslider';

$(() => {
  const { $JssorSlider$, $JssorBulletNavigator$ } = window;

  $('.slider-image-gallery').each((index, element) => {
    const $element = $(element);
    const options = {
      $AutoPlay: 1,
      $BulletNavigatorOptions: {
        $AutoCenter: 1,
        $ChanceToShow: 2,
        $Class: $JssorBulletNavigator$,
        $SpacingX: 5,
        $Scale: 0,
      },
    };

    const slider = new $JssorSlider$(element.id, options);

    function ScaleSlider() {
      const parentWidth = $element.parent().width();

      if (parentWidth) {
        slider.$ScaleWidth(parentWidth);
      } else {
        window.setTimeout(ScaleSlider, 30);
      }
    }

    if ($element.hasClass('responsive')) {
      ScaleSlider();

      $(window).bind('load', ScaleSlider);
      $(window).bind('resize', ScaleSlider);
      $(window).bind('orientationchange', ScaleSlider);
    }
  });
});
