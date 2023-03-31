import { GraphQLDateTime, GraphQLEmailAddress } from 'graphql-scalars';
import { GraphQLUpload } from 'graphql-upload';

const resolvers = {
  DateTime: GraphQLDateTime,
  Email: GraphQLEmailAddress,
  Upload: GraphQLUpload,
};

export default resolvers;
