const crudRoutes = [
    {
        path: '/posts',
        name: 'posts',
        component: () => import(/* webpackChunkName: crud_posts */ '../components/crud/Posts')
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import(/* webpackChunkName: crud_posts */ '../components/crud/Categories')
    }
];

export default crudRoutes;
