import { createRouter, createWebHistory } from 'vue-router'
import startView from '../core/start/startView.vue'

const routes = [
    {
        path: '/',
        component: startView
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
