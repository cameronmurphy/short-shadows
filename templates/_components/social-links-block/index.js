import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './styles.scss';

library.add(faFacebook, faInstagram, faYoutube);
dom.watch();
