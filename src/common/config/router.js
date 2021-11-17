let routes = [{
    redirect: { name: 'index' },
    component: 'layout',
    children: [{
            meta: {
                title: '后台首页'
            },
            component: 'index/index',
        }, {
            meta: {
                title: '创建商品'
            },
            component: 'shop/goods/create',
        }, {
            meta: {
                title: '商品列表'
            },
            component: 'shop/goods/list',
        }, {
            meta: {
                title: '相册管理'
            },
            component: 'image/index',
        }, {
            meta: {
                title: '分类管理'
            },
            component: 'shop/category/list',
        },
        {
            meta: { title: '商品规格' },
            component: 'shop/sku/list'
        },
        {
            meta: { title: '商品类型' },
            component: 'shop/type/list'
        }, {
            meta: { title: '商品评论' },
            component: 'shop/comment/list'
        },
        {
            meta: { title: '发票管理' },
            component: 'order/invoice/list'
        },
        {
            meta: { title: '售后管理' },
            component: 'order/after-sale/list'
        }, {
            meta: { title: '订单列表' },
            component: 'order/order/list'
        }, {
            meta: { title: '会员等级' },
            component: 'user/user-level/list'
        }, {
            meta: { title: '会员列表' },
            component: 'user/user-list/list'
        }, {
            meta: { title: '基础设置' },
            component: "set/base/index"
        }, {
            meta: { title: '物流设置' },
            component: "set/express/index"
        }, {
            meta: { title: '管理员管理' },
            component: "set/manager/index"
        }, {
            meta: { title: '交易设置' },
            component: "set/payment/index"
        }
    ]
}, {
    meta: {
        title: '登陆页面'
    },
    component: 'login/index'
}, {
    path: '*',
    redirect: { name: 'index' },
}]
let getroutes = function() {
    createRoutes(routes)
    return routes
}
let createRoutes = function(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i].component) return
        let value = getValue(arr[i].component)
        arr[i].name = value.replace(/\//g, '_')
        arr[i].path = `/${value}`
        let com =
            import (`../../views/${arr[i].component}.vue`)
        arr[i].component = () => com
        if (arr[i].children && arr[i].children.length > 0) {
            createRoutes(arr[i].children)
        }
    }
}
let getValue = function(str) {
    //获取最后一个/的索引
    let index = str.lastIndexOf('/')
        //获取最后一个/后面的值
    let value = str.substring(index + 1, str.length)
    if (value === 'index') {
        return str.substring(index, -1)
    }
    return str
}
export default getroutes()