import Home from '~/pages/Home';
import Upload from '~/pages/Upload';
import routes from '~/configs/routes';

const publicRoutes = [
    { path: routes.home, component: Home },
    { path: routes.upload, component: Upload },
    // { path: '/upload', component: Upload, layout: null },
];


const privateRoutes = [];

export { publicRoutes, privateRoutes };
