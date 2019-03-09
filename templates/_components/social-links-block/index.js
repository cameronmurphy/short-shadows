import { dom, library } from '@fortawesome/fontawesome-svg-core'; // eslint-disable-line no-unused-vars
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'; // eslint-disable-line no-unused-vars
import './styles.scss';

library.add(faFacebook, faInstagram);
dom.watch();
