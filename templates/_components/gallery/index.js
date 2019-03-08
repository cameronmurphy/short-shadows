import PhotoSwipe from 'photoswipe/dist/photoswipe.min';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default.min';
import $ from 'jquery';

import './styles.scss';

const GALLERY_ITEM_SELECTOR = '.gallery-item';

/**
 * @param {jQuery} $galleryElement
 * @returns {Array}
 */
function parseGalleryItems($galleryElement) {
  const items = [];

  $(GALLERY_ITEM_SELECTOR, $galleryElement).each((index, element) => {
    const $galleryItem = $(element);
    const $image = $galleryItem.find('img');

    const item = {
      src: $galleryItem.find('a').attr('href'),
      msrc: $galleryItem.find('img').attr('src'),
      w: parseInt($galleryItem.find('meta[itemprop="width"]').attr('content'), 10),
      h: parseInt($galleryItem.find('meta[itemprop="height"]').attr('content'), 10),
      el: $image.get(0),
    };

    items.push(item);
  });

  return items;
}

/**
 * @param {jQuery} $galleryElement
 * @param {boolean} animateFromThumbnail
 * @param {jQuery} $clickedGalleryItem
 */
function launchPhotoSwipe($galleryElement, animateFromThumbnail, $clickedGalleryItem) {
  const items = parseGalleryItems($galleryElement);
  const index = parseInt(
    $clickedGalleryItem
      .parent()
      .find('meta[itemprop="index"]')
      .attr('content'),
    10
  );

  /**
   * @param {int} galleryItemIndex
   * @returns {{x: Number, y: Number, w: Number}|boolean}
   */
  function getThumbBoundsFn(galleryItemIndex) {
    const { el } = items[galleryItemIndex];
    const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (!el || !animateFromThumbnail) {
      // There's no thumbnail on the screen for this gallery item
      // Shrink into the middle of the screen
      const $window = $(window);

      return {
        x: $window.width() / 2,
        y: $window.height() / 2 + pageYScroll,
        w: 0,
      };
    }

    const rect = el.getBoundingClientRect();
    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
  }

  const options = {
    index,
    getThumbBoundsFn,
    closeOnScroll: false,
    fullscreenEl: false,
    shareEl: false,
    history: false,
  };

  const gallery = new PhotoSwipe($('.pswp').get(0), PhotoSwipeUIDefault, items, options);
  gallery.init();
}

/**
 * @param {jQuery} $galleryElement
 * @param {boolean} animateFromThumbnail
 */
function initGallery($galleryElement, animateFromThumbnail) {
  $(`${GALLERY_ITEM_SELECTOR} a`, $galleryElement).on('click', event => {
    const $thumbnailAnchor = $(event.target);
    launchPhotoSwipe($galleryElement, animateFromThumbnail, $thumbnailAnchor.parent());
    return false;
  });
}

/**
 * @param {string} gallerySelector
 * @param {boolean} animateFromThumbnail You may not want to zoom from the thumbnail if it's not
 *                                       the correct aspect ratio, looks ugly. false to disable.
 */
function init(gallerySelector, animateFromThumbnail = true) {
  $(gallerySelector).each((galleryIndex, element) => {
    const $element = $(element);
    initGallery($element, animateFromThumbnail);
  });
}

export default init;
