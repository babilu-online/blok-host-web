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
