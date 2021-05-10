const axios = require('axios');

const resolvers = {
  Query: {
    calculatePrice: async (root, args) => {
      try {
        const { data } = await axios.get(
          'https://api.coindesk.com/v1/bpi/currentprice.json'
        );
        const btcUSD = parseFloat(data.bpi.USD.rate.replace(',', ''));

        if (args.type === 'sell') {
          const sellMargin = btcUSD - (args.margin / 100) * btcUSD;
          console.log(sellMargin);
          return sellMargin * args.exchangeRate;
        } else if (args.type === 'buy') {
          const buyMargin = btcUSD + (args.margin / 100) * btcUSD;
          return buyMargin * args.exchangeRate;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
