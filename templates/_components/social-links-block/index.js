import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faInstagram, faSoundcloud, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './styles.scss';

library.add(faFacebook, faInstagram, faSoundcloud, faYoutube);
dom.watch();
