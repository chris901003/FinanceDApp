import { createRouter, createWebHistory } from 'vue-router'
import mainView from '../core/main/mainView.vue'

const routes = [
    {
        path: '/',
        component: mainView
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
