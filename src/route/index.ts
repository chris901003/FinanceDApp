import { createRouter, createWebHistory } from 'vue-router'
import startView from '../core/start/startView.vue'
import mainView from '../core/main/mainView.vue'
import withoutMetaMaskView from '../core/main/withoutMetaMaskView.vue'
import linkToMetaMaskView from '../core/main/linkToMetaMaskView.vue'

const routes = [
    {
        path: '/',
        component: startView
    },
    {
        path: '/main',
        component: mainView,
        beforeEnter: ((to: any, _: any, next: any) => {
            if (to.name == 'link-to-metamask') {
                const { ethereum } = window as any
                if (!ethereum) {
                    next('/main/without-metamask')
                } else {
                    next()
                }
            } else {
                next()
            }
        }),
        children: [
            {
                name: 'without-metamask',
                path: 'without-metamask',
                component: withoutMetaMaskView
            },
            {
                name: 'link-to-metamask',
                path: 'link-to-metamask',
                component: linkToMetaMaskView
            }
        ]
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
