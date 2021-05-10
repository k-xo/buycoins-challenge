const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  enum BuySell {
    buy
    sell
  }

  type Query {
    calculatePrice(type: BuySell, margin: Float!, exchangeRate: Float!): Float!
  }
`;

const resolvers = {
  Query: {
    calculatePrice: async (root, args) => {
      try {
        const { data } = await axios.get(
          'https://api.coindesk.com/v1/bpi/currentprice.json'
        );
        const btcUSD = parseInt(data.bpi.USD.rate);

        if (args.type === 'sell') {
          const sellMargin = btcUSD - (args.margin / 100) * btcUSD;
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
