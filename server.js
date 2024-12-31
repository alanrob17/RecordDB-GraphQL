const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat
} = require('graphql')
const app = express()

const artists = require('./artists')
const records = require('./records')

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  description: 'This represents an artist of a record',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    firstname: { type: GraphQLNonNull(GraphQLString) },
    lastname: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    biography: { type: GraphQLNonNull(GraphQLString) },
    records: {
      type: new GraphQLList(RecordType),
      resolve: (artist) => {
        return records.filter(record => record.artistId === artist.id)
      }
    }
  })
})

const RecordType = new GraphQLObjectType({
  name: 'Record',
  description: 'This represents a record written by an artist',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    artistId: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    field: { type: GraphQLNonNull(GraphQLString) },
    recorded: { type: GraphQLNonNull(GraphQLInt) },
    label: { type: GraphQLNonNull(GraphQLString) },
    pressing: { type: GraphQLNonNull(GraphQLString) },
    rating: { type: GraphQLNonNull(GraphQLString) },
    discs: { type: GraphQLNonNull(GraphQLInt) },
    media: { type: GraphQLNonNull(GraphQLString) },
    bought: { type: GraphQLNonNull(GraphQLString) },
    cost: { type: GraphQLNonNull(GraphQLFloat) },
    review: { type: GraphQLString },
    artist: {
      type: ArtistType,
      resolve: (record) => {
        return artists.find(artist => artist.id === record.artistId)
      }
    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    record: {
      type: RecordType,
      description: 'A Single Record',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => records.find(record => record.id === args.id)
    },
    records: {
      type: new GraphQLList(RecordType),
      description: 'List of All Records',
      resolve: () => records
    },
    artists: {
      type: new GraphQLList(ArtistType),
      description: 'List of All artists',
      resolve: () => artists
    },
    artist: {
      type: ArtistType,
      description: 'A Single Artist',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => artists.find(artist => artist.id === args.id)
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addRecord: {
      type: RecordType,
      description: 'Add a record',
      args: {
        artistId: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        field: { type: GraphQLNonNull(GraphQLString) },
        recorded: { type: GraphQLNonNull(GraphQLInt) },
        label: { type: GraphQLNonNull(GraphQLString) },
        pressing: { type: GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLNonNull(GraphQLString) },
        discs: { type: GraphQLNonNull(GraphQLInt) },
        media: { type: GraphQLNonNull(GraphQLString) },
        bought: { type: GraphQLNonNull(GraphQLString) },
        cost: { type: GraphQLNonNull(GraphQLFloat) },
        review: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        const record = { 
          id: records.length + 1, 
          artistId: args.artistId, 
          name: args.name, 
          field: args.field,
          recorded: args.recorded,
          label: args.label,
          pressing: args.pressing,
          rating: args.rating,
          discs: args.discs,
          media: args.media,
          bought: args.bought,
          cost: args.cost,
          review: args.review
        }
        records.push(record)
        return record
      }
    },
    addArtist: {
      type: ArtistType,
      description: 'Add an artist',
      args: {
        firstname: { type: GraphQLNonNull(GraphQLString) },
        lastname: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        biography: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const artist = { 
          id: artists.length + 1, 
          firstname: args.firstname, 
          lastname: args.lastname, 
          name: args.name, 
          biography: args.biography 
        }
        artists.push(artist)
        return artist
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(5000, () => console.log('Server Running'))
