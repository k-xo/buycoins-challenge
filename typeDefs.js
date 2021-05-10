const { gql } = require('apollo-server');

const typeDefs = gql`
  enum BuySell {
    buy
    sell
  }

  type Query {
    calculatePrice(type: BuySell, margin: Float!, exchangeRate: Float!): Float!
  }
`;

module.exports = typeDefs;
