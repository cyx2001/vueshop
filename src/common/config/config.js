module.exports = {
    logo: "后台管理",
    narBar: {
        active: "0",
        list: [{
                name: "首页",
                subactive: "0",
                submenu: [{
                        icon: "el-icon-s-home",
                        name: "后台首页",
                        pathname: 'index'
                    }, {
                        icon: "el-icon-picture",
                        name: "相册管理",
                        pathname: 'image'
                    },
                    {
                        icon: "el-icon-s-claim",
                        name: "商品列表",
                        pathname: 'shop_goods_list'
                    },
                ],
            },
            {
                name: "商品",
                subactive: "0",
                submenu: [{
                    icon: "el-icon-s-claim",
                    name: "商品列表",
                    pathname: 'shop_goods_list'
                }, {
                    icon: "el-icon-s-help",
                    name: "分类管理",
                    pathname: 'shop_category_list'
                }, {
                    icon: "el-icon-s-order",
                    name: "商品规格",
                    pathname: 'shop_sku_list'
                }, {
                    icon: "el-icon-s-ticket",
                    name: "商品类型",
                    pathname: 'shop_type_list'
                }, {
                    icon: "el-icon-chat-line-round",
                    name: "商品评论",
                    pathname: 'shop_comment_list'
                }, ]
            },
            {
                name: "订单",
                subactive: "0",
                submenu: [{
                    icon: "el-icon-document-checked",
                    name: "发票管理",
                    pathname: 'order_invoice_list'
                }, {
                    icon: "el-icon-notebook-2",
                    name: "售后管理",
                    pathname: 'order_after-sale_list'
                }, {
                    icon: "el-icon-s-order",
                    name: "订单列表",
                    pathname: 'order_order_list'
                }, ]
            },
            {
                name: "会员",
                subactive: "0",
                submenu: [{
                    icon: "el-icon-s-custom",
                    name: "会员等级",
                    pathname: 'user_user-level_list'
                }, {
                    icon: "el-icon-notebook-2",
                    name: "会员列表",
                    pathname: 'user_user-list_list'
                }, ]
            },
            {
                name: "设置",
                subactive: "0",
                submenu: [{
                    icon: "el-icon-s-claim",
                    name: "基础设置",
                    pathname: "set_base"
                }, {
                    icon: "el-icon-s-claim",
                    name: "物流设置",
                    pathname: "set_express"
                }, {
                    icon: "el-icon-s-claim",
                    name: "管理员管理",
                    pathname: "set_manager"
                }, {
                    icon: "el-icon-s-claim",
                    name: "交易设置",
                    pathname: "set_payment"
                }]
            }
        ],
    }
}