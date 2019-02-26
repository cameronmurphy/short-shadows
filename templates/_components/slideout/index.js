import Slideout from 'slideout';
import './styles.scss';

const init = (panelSelector, menuSelector, toggleSelector, options) => {
  const slideout = new Slideout({
    panel: document.querySelector(panelSelector),
    menu: document.querySelector(menuSelector),
    padding: 256,
    tolerance: 70,
    ...options,
  });

  // Toggle button
  document.querySelector(toggleSelector).addEventListener('click', () => {
    slideout.toggle();
  });

  return slideout;
};

export default init;
