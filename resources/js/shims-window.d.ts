import axios from 'axios';
import lodash from 'lodash';
import route from 'ziggy-js';
import Alpine from 'alpinejs';

declare global {
    export interface Window {
        _: typeof lodash;
        axios: typeof axios;
        route: typeof route;
        Alpine: typeof Alpine;
    }
}
