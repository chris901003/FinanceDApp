import { createRouter, createWebHistory } from 'vue-router'
import startView from '../core/start/startView.vue'
import metamaskMainView from '../core/metamask/metaMaskMainView.vue'
import withoutMetaMaskView from '../core/metamask/withoutMetaMaskView.vue'
import linkToMetaMaskView from '../core/metamask/linkToMetaMaskView.vue'
import mainView from '../core/main/mainView.vue'
import newInfoView from '../core/main/newInfoView.vue'
import depositView from '../core/main/depositView.vue'
import withdrawView from '../core/main/withdrawView.vue'
import earnMoneyView from '../core/main/earnMoneyView.vue'
import loanView from '../core/main/loanView.vue'
import { isConnectToMetaMask } from '../manager/ethersManager'

const routes = [
    {
        path: '/',
        name: 'FinancelDAPP',
        component: startView
    },
    {
        path: '/metamask',
        name: 'metamask',
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
        name: 'main',
        redirect: '/main/new-info',
        component: mainView,
        children: [
            {
                name: 'new-info',
                path: 'new-info',
                component: newInfoView
            },
            {
                name: 'earn-money',
                path: 'earn-money',
                component: earnMoneyView
            },
            {
                name: 'deposit',
                path: 'deposit',
                component: depositView
            },
            {
                name: 'withdraw',
                path: 'withdraw',
                component: withdrawView
            },
            {
                name: 'loan',
                path: 'loan',
                component: loanView
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

router.beforeEach(async (to: any, _: any, next: any) => {
    if (to.name == 'FinancelDAPP' || to.name.includes('metamask')) {
        next()
    } else {
        const isMetaMaskConnect = await isConnectToMetaMask()
        if (isMetaMaskConnect) {
            next()
        } else {
            next('metamask')
        }
    }
})

export default router
