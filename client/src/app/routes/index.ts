import { URL_HOMEPAGE, URL_UIKIT } from '../../common/constants';
import { IRoutes } from '../types';
import Homepage from '../../screens/Homepage';
import UIKit from '../../screens/UIKit';

const routes: IRoutes = [
    {
        path: URL_HOMEPAGE,
        Component: Homepage,
    },
    {
        path: URL_UIKIT,
        Component: UIKit,
    },

    /**
     * Other routes will go here...
     */
];

export default routes;
