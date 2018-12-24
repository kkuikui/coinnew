import Main from '../pages/main/main'
export default [{
  path: '/',
  component: Main,
  redirect: '/index',
  children: [{
      name: 'Index',
      path: '/index',
      component: resolve => {
        require(['../pages/index/index'], resolve)
      }
    },
    {
      path: '/help',
      component: resolve => {
        require(['../pages/cms/help'], resolve)
      }
    },
    {
      path: '/login',
      component: resolve => {
        require(['../pages/uc/login'], resolve)
      }
    },
    {
      path: '/register',
      component: resolve => {
        require(['../pages/uc/register'], resolve)
      }
    },
    {
      path: '/exchange',
      component: resolve => {
        require(['../pages/exchange/exchange'], resolve)
      }
    },
    {
      path: '/findPwd',
      component: resolve => {
        require(['../pages/uc/findpwd'], resolve)
      }
    },
    {
      path: '/login/returnUrl/:returnUrl',
      component: resolve => {
        require(['../pages/uc/login'], resolve)
      }
    },
    {
      path: '/exchange/*',
      component: resolve => {
        require(['../pages/exchange/exchange'], resolve)
      }
    },
    {
      path: '/notice',
      component: resolve => {
        require(['../pages/cms/Notice'], resolve)
      }
    },
    {
      path: '/notice/index',
      component: resolve => {
        require(['../pages/cms/NoticeItem'], resolve)
      }
    },
    {
      path: '/otc',
      component: resolve => {
        require(['../pages/otc/Main'], resolve)
      },
      children: [{
          path: 'trade/*',
          component: resolve => {
            require(['../pages/otc/Trade'], resolve)
          }
        },
        {
          path: 'trade',
          component: resolve => {
            require(['../pages/otc/Trade'], resolve)
          }
        },
        {
          path: 'ad',
          component: resolve => {
            require(['../components/otc/MyAd'], resolve)
          }
        },
        {
          path: 'ad/create',
          component: resolve => {
            require(['../pages/otc/AdPublish'], resolve)
          }
        },
        {
          path: 'ad/update',
          component: resolve => {
            require(['../pages/otc/AdPublish'], resolve)
          }
        },
        {
          path: 'order',
          component: resolve => {
            require(['../components/uc/myorder'], resolve)
          }
        }
      ]
    },
    {
      path: '/finance',
      component: resolve => {
        require(['../pages/uc/Finance'], resolve)
      },
      children: [{
          path: '',
          component: resolve => {
            require(['../components/uc/MoneyIndex'], resolve)
          }
        },
        {
          // 个人资产
          path: 'index',
          component: resolve => {
            require(['../components/uc/MoneyIndex'], resolve)
          }
        },
        {
          path: 'record',
          component: resolve => {
            require(['../components/uc/Record'], resolve)
          }
        },
        {
          path: 'recharge',
          component: resolve => {
            require(['../components/uc/Recharge'], resolve)
          }
        },
        {
          path: 'withdraw',
          component: resolve => {
            require(['../components/uc/Withdraw'], resolve)
          }
        },
        {
          path: 'index/buyCTGC',
          component: resolve => {
            require(['../components/uc/buyCTGC'], resolve)
          }
        },
        {
          path: 'withdraw/address',
          component: resolve => {
            require(['../components/uc/WithdrawAddress'], resolve)
          }
        }
      ]
    },
    {
      path: '/uc',
      component: resolve => {
        require(['../pages/uc/MemberCenter'], resolve)
      },
      children: [{
          path: '',
          component: resolve => {
            require(['../components/uc/Safe'], resolve)
          }
        },
        {
          path: 'safe',
          component: resolve => {
            require(['../components/uc/Safe'], resolve)
          }
        },
        {
          path: 'account',
          component: resolve => {
            require(['../components/uc/Account'], resolve)
          }
        },
        {
          path: 'myextension',
          component: resolve => {
            require(['../components/uc/MyExtension'], resolve)
          }
        }
      ]
    },
    {
      name: 'tradeInfo',
      path: '/otc/tradeInfo',
      component: resolve => {
        require(['../pages/otc/TradeInfo'], resolve)
      }
    },
    {
      path: '/checkuser',
      component: resolve => {
        require(['../pages/otc/CheckUser'], resolve)
      }
    },
    {
      path: '/chat',
      component: resolve => {
        require(['../pages/otc/Chat'], resolve)
      }
    },
    {
      path: '/identbusiness',
      component: resolve => {
        require(['../pages/uc/IdentBusiness'], resolve)
      }
    },
    {
      path: '/newhelp',
      component: resolve => {
        require(['../pages/cms/NewHelp'], resolve)
      },
      children: [{
          path: '',
          component: resolve => {
            require(['../components/cms/NoticeDeails'], resolve)
          }
        },
        {
          path: 'index',
          component: resolve => {
            require(['../components/cms/NoticeDeails'], resolve)
          }
        }
      ]
    },
    {
      path: '/about-rule',
      component: resolve => {
        require(['../pages/cms/ExchargeRule'], resolve)
      }
    },
    {
      path: '/about-protocol',
      component: resolve => {
        require(['../pages/cms/UserProtocol'], resolve)
      }
    },
    {
      path: '/about-fee',
      component: resolve => {
        require(['../pages/cms/FeeNote'], resolve)
      }
    },
    {
      path: '/about-merchant',
      component: resolve => {
        require(['../pages/cms/MerchantProtocol'], resolve)
      }
    },
    {
      path: '/about-notice',
      component: resolve => {
        require(['../pages/cms/HomeNotice'], resolve)
      }
    },
    {
      path: '/about-us',
      component: resolve => {
        require(['../pages/cms/AboutUs'], resolve)
      }
    },
    {
      path: '/join-us',
      component: resolve => {
        require(['../pages/cms/JoinUs'], resolve)
      }
    }
  ]
}]
