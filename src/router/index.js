import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home2',
        component: () => import('@/views/index.vue'),
    },
    {
        path: '/plasch/:id',
        name: 'Home',
        component: () => import('@/views/plasch/index.vue'),
        meta: {
            icon: "/src/assets/res/images/favicon.png",
            title: '学校平台' // 设置页面标题
        }
    },
    {
        path: '/facerec',
        name: 'facerec2',
        component: () => import('@/views/facerec/index.vue'),
        meta: {
            icon: "/src/assets/res/images/favicon.png",
            title: '人脸识别登船' // 设置页面标题
        }
    },
    {
        path: '/tencos',
        name: 'tencos2',
        component: () => import('@/views/tencos/index.vue'),
        meta: {
            icon: "/src/assets/res/images/favicon.png",
            title: '腾讯COS' // 设置页面标题
        }
    },
    {
        path: '/pptindex',
        name: 'pptindex2',
        component: () => import('@/views/pptindex/index.vue'),
        meta: {
            icon: "/src/assets/res/images/favicon.png",
            title: 'pptindex' // 设置页面标题
        }
    },
    {
        path: '/interior',
        name: 'interior',
        component: () => import('@/views/interior/public.vue'),
        children: [
            {
                path: '/r1',
                name: 'r1',
                children: [
                    {
                        path: '/interior/page1',
                        name: 'page1',
                        component: () => import('@/views/interior/page1.vue'),
                        meta: {
                            icon: "/src/assets/res/images/favicon.png",
                            title: '页面1' // 设置页面标题
                        }
                    },
                    {
                        path: '/interior/page2',
                        name: 'page2',
                        component: () => import('@/views/interior/page2.vue'),
                        meta: {
                            icon: "/src/assets/res/images/favicon.png",
                            title: '页面2' // 设置页面标题
                        }
                    },
                ]
            },
            {
                path: '/gongjv',
                name: '工具',
                children:[
                    {
                        path: '/interior/pptindex',
                        name: 'pptindex',
                        component: () => import('@/views/pptindex/index.vue'),
                        meta: {
                            icon: "/src/assets/res/images/favicon.png",
                            title: 'pptindex' // 设置页面标题
                        }
                    },
                    {
                        path: '/interior/tencos',
                        name: 'tencos',
                        component: () => import('@/views/tencos/index.vue'),
                        meta: {
                            icon: "/src/assets/res/images/favicon.png",
                            title: '腾讯COS' // 设置页面标题
                        }
                    },
                    {
                        path: '/interior/task',
                        name: '项目情况',
                        component: () => import('@/views/task/index.vue'),
                        meta: {
                            icon: "/src/assets/res/images/favicon.png",
                            title: '项目情况' // 设置页面标题
                        }
                    },
                ]},

        ]
    },
    {
        path: '/login',
        name: '登录',
        component: () => import('@/views/login/index.vue'),
        meta: {
            icon: "/src/assets/res/images/favicon.png",
            title: '登录' // 设置页面标题
        }
    },
    {
        path: '/yzjjob',
        name: '工作记录',
        component: () => import('@/views/yzjjob/index.vue'),
        meta: {
            icon: "/src/assets/res/images/favicon.png",
            title: '工作记录' // 设置页面标题
        }
    },
    {
        path: '/encryptedvideo',
        name: '视频播放',
        component: () => import('@/views/encryptedvideo.vue'),
        meta: {
            icon: "/src/assets/res/images/favicon.png",
            title: '视频播放' // 设置页面标题
        }
    },
    {
        path: '/sharevideo',
        name: '分享视频播放',
        component: () => import('@/views/sharevideo.vue'),
        meta: {
            icon: "/src/assets/res/images/favicon.png",
            title: '分享视频播放' // 设置页面标题
        }
    },
    {
        path: '/linktoqrcode',
        name: '链接二维码',
        component: () => import('@/views/linktoqrcode.vue'),
        meta: {
            icon: "/src/assets/res/images/favicon.png",
            title: '链接二维码' // 设置页面标题
        }
    },
    {
        path: '/anliku',
        name: '案例库',
        component: () => import('@/views/anliku.vue'),
        meta: {
            icon: "/src/assets/res/images/favicon.png",
            title: '案例库', // 设置页面标题
            requiresAuth: true
        }
    },
    {
        path: '/gante',
        name: '甘特图',
        component: () => import('@/views/gante.vue'),
        meta: {
            icon: "/src/assets/res/images/favicon.png",
            title: '甘特图', // 设置页面标题
        }
    },
    {
        path: '/check',
        name: '任务检查',
        component: () => import('@/views/任务检查.vue'),
        meta: {
            icon: "/src/assets/res/images/favicon.png",
            title: '任务检查', // 设置页面标题
        }
    },
    {
        path: '/fenpei',
        name: '分配任务',
        component: () => import('@/views/分配任务/TaskV.vue'),
        children: [
            {
                path: 'videoauto', // 相对路径
                name: '视频自动生成',
                component: () => import('@/views/分配任务/视频自动生成.vue')
            },
            {
                path: 'manualadd', // 相对路径
                name: '视频手动添加',
                component: () => import('@/views/分配任务/视频手动添加.vue')
            }
        ]
    },
    {
        path: '/zhihui',
        name: '智慧职教',
        component: () => import('@/views/智慧职教/index.vue'),
    },
    {
        path: '/examine',
        name: '审阅',
        component: () => import('@/views/审阅平台/index.vue'),
    },
    {
        path: '/cutaudio',
        name: '剪辑音频',
        component: () => import('@/views/设计用字幕.vue'),
    },
    {
        path: '/shipinzimu',
        name: '视频用字幕',
        component: () => import('@/views/视频用字幕.vue'),
    },
    {
        path: '/subtitlemark',
        name: '任务情况',
        component: () => import('@/views/字幕校对.vue'),
    },

    {
        path: '/cutvideo',
        name: '视频剪辑',
        component: () => import('@/views/视频剪辑/index.vue'),
    }






]

const router = createRouter({
    // history: createWebHashHistory(),
    history:createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})


router.beforeEach((to, from, next) => {

    // if (to.meta.requiresAuth && !isAuthenticated()) {
    //     // 如果需要登录且未登录，则跳转到登录页面
    //     next('/login')
    // } else {
    //     // 设置页面标题
    //     document.title = to.meta.title || 'newweb'
        next()
    // }

})


// 判断登录状态
function isAuthenticated() {
    // 从localStorage中获取登录状态
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    // 返回登录状态
    return isAuthenticated === 'true'
}


export default router;