import $ from 'jquery';
import './styles.scss';
import init from '../slideout';

$(() => {
  const slideout = init('.content', '.mobile-menu', '.hamburger', { side: 'right', touch: false });

  const hamburger = $('.hamburger');
  slideout.on('beforeopen', () => hamburger.addClass('is-active'));
  slideout.on('beforeclose', () => hamburger.removeClass('is-active'));
});
