import { createRouter, createWebHistory } from 'vue-router'
import startView from '../core/start/startView.vue'
import metamaskMainView from '../core/metamask/metaMaskMainView.vue'
import withoutMetaMaskView from '../core/metamask/withoutMetaMaskView.vue'
import linkToMetaMaskView from '../core/metamask/linkToMetaMaskView.vue'
import mainView from '../core/main/mainView.vue'

const routes = [
    {
        path: '/',
        component: startView
    },
    {
        path: '/metamask',
        component: metamaskMainView,
        beforeEnter: ((to: any, _: any, next: any) => {
            if (to.name == 'link-to-metamask') {
                const { ethereum } = window as any
                if (!ethereum) {
                    next('/metamask/without-metamask')
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
        path: '/main',
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
