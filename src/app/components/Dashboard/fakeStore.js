const imageSources = {
  BTC: 'db-assets/bitcoin.png',
  USDT: 'db-assets/tether.png',
};

// To be fetched from an api

export const currencyOptions = {
  BTC: {
    symbol: 'BTC',
    depositPath: function () {
      return '/dashboard/deposits/' + this.symbol;
    },
    withdrawPath: function () {
      return '/dashboard/withdraw/' + this.symbol;
    },
    imgSrc: function () {
      return imageSources[this.symbol];
    },
    availableBalanceExchange: 1,
    availableBalanceOptions: 0.0001,
    availableBalanceFutures: 0.003,
    fullName: 'Bitcoin',
    toFixed: 8,
  },

  USDT: {
    symbol: 'USDT',
    depositPath: function () {
      return '/dashboard/deposits/' + this.symbol;
    },
    withdrawPath: function () {
      return '/dashboard/withdraw/' + this.symbol;
    },
    imgSrc: function () {
      return imageSources[this.symbol];
    },
    availableBalanceExchange: 1400,
    availableBalanceOptions: 700,
    availableBalanceFutures: 300,
    fullName: 'Tether',
    toFixed: 2,
  },
};
