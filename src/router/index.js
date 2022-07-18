import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "home" */ '../views/Dashboard')
    },
    {
        path: '/sites',
        name: 'Sites',
        component: () => import(/* webpackChunkName: "home" */ '../views/SiteIndex')
    },
    {
        path: '/sites/:id',
        name: 'Site Show',
        component: () => import(/* webpackChunkName: "home" */ '../views/SiteShow')
    },
    {
        path: '/drives',
        name: 'Drives',
        component: () => import(/* webpackChunkName: "home" */ '../views/DriveIndex')
    },
    {
        path: '/coming-soon',
        name: 'Coming Soon',
        component: () => import(/* webpackChunkName: "home" */ '../views/ComingSoon')
    },
    {
        path: '/upload',
        name: 'Upload',
        component: () => import(/* webpackChunkName: "home" */ '../views/UploadSite')
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import(/* webpackChunkName: "home" */ '../views/Search')
    },
    {
        path: "*",
        redirect: "/"
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
