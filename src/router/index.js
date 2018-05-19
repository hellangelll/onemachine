import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'

// import store from '../store'
// import HelloWorld from '@/components/HelloWorld'
import index from '../pages/index.vue'
import printInfo from '../pages/printInfo.vue'

import printLicense from '../pages/printLicense'
import printLicenseOne from '../pages/printLicense/one'
import printLicenseTwo from '../pages/printLicense/two'
import printLicenseThree from '../pages/printLicense/three'
import printLicenseFour from '../pages/printLicense/four'

import printStatusNoCompany from '../pages/printStatus/print-no-company'
import printStatusNoLicense from '../pages/printStatus/print-no-license'
import printStatusSuccess from '../pages/printStatus/print-success'
import printStatusFail from '../pages/printStatus/print-fail'
import printStatusIng from '../pages/printStatus/print-ing'
import printStatusEnd from '../pages/printStatus/print-end'



Vue.use(Router)


const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/printLicense',
      name: 'printLicense',
      component: printLicense,
      children: [
        {path: '/printLicense/one', component: printLicenseOne, name: '身份证识别', menuShow: true},
        {path: '/printLicense/two', component: printLicenseTwo, name: '身份验证', menuShow: true},
        // 正本打印
        {path: '/printLicense/three', component: printLicenseThree, name: '营业执照正本打印', menuShow: true},
        // 副本打印
        {path: '/printLicense/four', component: printLicenseFour, name: '营业执照副本打印', menuShow: true},
        // 没有公司可供打印
        {path: '/printLicense/print-no-company', component: printStatusNoCompany, name: '没有公司打印', menuShow: true},
        // 没有公司可供打印
        {path: '/printLicense/print-no-license', component: printStatusNoLicense, name: '没有营业执照打印', menuShow: true},
        {path: '/printLicense/print-success/:canPrint', component: printStatusSuccess, name: '打印成功', menuShow: true, props: true},
        {path: '/printLicense/print-ing/:canPrint', component: printStatusIng, name: '正在打印', menuShow: true, props: true},
        {path: '/printLicense/print-ing', component: printStatusIng, name: '正在打印', menuShow: true},
        {path: '/printLicense/print-end', component: printStatusEnd, name: '打印结束', menuShow: true, props: true},
        {path: '/printLicense/print-success', component: printStatusSuccess, name: '打印成功', menuShow: true},
        {path: '/printLicense/print-fail', component: printStatusFail, name: '打印失败', menuShow: true}
      ]
    },
    {
      path: '/printInfo',
      name: 'printInfo',
      component: printInfo
    },
    {
      path: '/recognition',
      name: 'printInfo',
      component: printInfo
    }
  ]
})

// router.beforeEach((to, from, next) => {
//  // 存储一下params备用
//  axios.get('common/errors').then(data => {
//     if(data.status == 200){
//         window.__common_errors = data.data;
//     }
// })
//  next() // 千万不要忘了，否则导航会被“掐死”在这儿。:-D
// })


export default router
