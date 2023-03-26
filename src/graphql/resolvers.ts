import { GraphQLDateTime, GraphQLEmailAddress } from 'graphql-scalars';

const resolvers = {
  DateTime: GraphQLDateTime,
  Email: GraphQLEmailAddress,
};

export default resolvers;
