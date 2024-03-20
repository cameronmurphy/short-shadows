import $ from 'jquery';

import initGallery from '../gallery';

import './styles.scss';

$(() => {
  initGallery('.gallery-block');

  $('.gallery-block .button').on('click', (event) => {
    const $target = $(event.target);
    // Propagate to the anchor below
    $target.parent().find('a').trigger('click');
  });
});
