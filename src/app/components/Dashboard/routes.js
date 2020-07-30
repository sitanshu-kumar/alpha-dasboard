import Account from './Account-Preferences/Account/Account';
import Affiliate from './Account-Preferences/Affiliate/Affiliate';
import ApiSecret from './Account-Preferences/Api-Secret/ApiSecret';
import Balances from './Exchange-Wallet/Balances/Balances';
import Deposit from './Exchange-Wallet/Deposit/Deposit';
import Withdraw from './Exchange-Wallet/Withdraw/Withdraw';
import DepositCoins from './Exchange-Wallet/Deposit/DepositCoins';
import WithdrawCoins from './Exchange-Wallet/Withdraw/WithdrawCoins';
import FuturesTransfer from './Futures-Wallet/Transfer/FuturesTransfer';
import OptionTransfer from './Options-Wallet/Transfer/OptionTransfer';
import ChangePassword from './Account-Preferences/change-password/index';
import Change2FA from './Account-Preferences/change-2fa/change-2fa';

const dashboardRoutes = [
  {
    path: '/balances',
    component: Balances,
    layout: '/dashboard',
    activeDashboard: 'Balances',
  },
  {
    path: '/deposits/BTC',
    component: DepositCoins,
    layout: '/dashboard',
    activeDashboard: 'Deposit',
  },
  {
    path: '/deposits/USDT',
    component: DepositCoins,
    layout: '/dashboard',
    activeDashboard: 'Deposit',
  },
  {
    path: '/deposits',
    component: Deposit,
    layout: '/dashboard',
    activeDashboard: 'Deposit',
  },
  {
    path: '/withdraw/BTC',
    component: WithdrawCoins,
    layout: '/dashboard',
    activeDashboard: 'Withdraw',
  },
  {
    path: '/withdraw/USDT',
    component: WithdrawCoins,
    layout: '/dashboard',
    activeDashboard: 'Withdraw',
  },
  {
    path: '/withdraw',
    component: Withdraw,
    layout: '/dashboard',
    activeDashboard: 'Withdraw',
  },
  {
    path: '/account',
    component: Account,
    layout: '/dashboard',
    activeDashboard: 'My Profile',
  },
  // {
  //   path: '/security',
  //   component: Security,
  //   layout: '/dashboard',
  //   activeDashboard: 'Security',
  // },
  {
    path: '/change-password',
    component: ChangePassword,
    activeDashboard: 'Change Password',
    layout: '/dashboard',
  },
  {
    path: '/configure-2fa',
    component: Change2FA,
    activeDashboard: '2FA Configuration',
    layout: '/dashboard',
  },
  {
    path: '/affiliate',
    component: Affiliate,
    layout: '/dashboard',
    activeDashboard: 'Affiliate',
  },
  {
    path: '/apiSecret',
    component: ApiSecret,
    layout: '/dashboard',
    activeDashboard: 'Get Api Secret',
  },
  {
    path: '/futures',
    component: FuturesTransfer,
    layout: '/dashboard',
    activeDashboard: 'Futures Wallet',
  },
  {
    path: '/options',
    component: OptionTransfer,
    layout: '/dashboard',
    activeDashboard: 'Options Wallet',
  },
];

export default dashboardRoutes;
