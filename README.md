# RecordDb in GraphQL

Using GraphQL with JavaScript allows developers to create flexible and efficient APIs that enable clients to request exactly the data they need. Here’s an overview of how to get started with GraphQL in a JavaScript environment, particularly using Node.js and libraries like ``graphql-js`` and Express.

## Overview of GraphQL

GraphQL is a query language for APIs that provides a more efficient and powerful alternative to REST. It allows clients to specify the structure of the data they need, reducing over-fetching and under-fetching of data.

### Key Features

**Strongly Typed Schema**: GraphQL APIs are defined by a schema that specifies the types of data available and how they can be queried.

**Single Endpoint**: Unlike REST, which often requires multiple endpoints, GraphQL typically exposes a single endpoint for all queries.

**Client-Specified Queries**: Clients can request exactly what they need, leading to more efficient data retrieval.

## Install packages

```bash
    npm i express
```

.

```bash
    npm i express-graphql
```

.

```bash
    npm i graphql
```

.

```bash
    npm install --save-dev nodemon
```

Express GraphQL has been deprecated. You should use this but I can't get it working.

```bash
    npm i graphql-http
```

## Running the server

```bash
    npm run devStart
```

## Queries

Select all Artists and Records.

```bash
query {
  artists {
    id
    firstname
    lastname
    name
    records {
      id
      name
      field
      recorded
	  label
	  pressing
	  rating
	  discs
      media
      bought
      cost
    }
  }
}
```

Returns.

```bash
{
  "data": {
    "artists": [
      {
        "id": 528,
        "firstname": "Mick",
        "lastname": "Abrahams",
        "name": "Mick Abrahams",
        "records": [
          {
            "id": 1431,
            "name": "All Said And Done",
            "field": "Rock",
            "recorded": 1991,
            "label": "Elite",
            "pressing": "Eng",
            "rating": "*",
            "discs": 1,
            "media": "CD",
            "bought": "03-03-2003",
            "cost": 0
          }
        ]
      },
      {
        ...
```

Query a single Artist.

```bash
query {
  artist(id: 114) {
    id
    name
    biography
    records {
      id
      name
      field
      recorded
      label
      pressing
      rating
      discs
      media
      bought
      cost
    }
  }
}
```

Returns.

```bash
{
  "data": {
    "artist": {
      "id": 114,
      "name": "Bob Dylan",
      "records": [
        {
          "id": 263,
          "name": "Bob Dylan",
          "field": "Folk",
          "recorded": 1961,
          "label": "CBS",
          "pressing": "Aus",
          "rating": "****",
          "discs": 1,
          "media": "CD",
          "bought": "09-01-1989",
          "cost": 10
        },
        {
          "id": 264,
          "name": "Bob Dylan",
          "field": "Folk",
          "recorded": 1961,
          "label": "CBS",
          "pressing": "Aus",
          "rating": "****",
          "discs": 1,
          "media": "R",
          "bought": "01-01-1900",
          "cost": 0
        },
        ...
```

Query a single Record.

```bash
query {
  record(id: 1172) {
    id
    name
    field
    recorded
    label
    pressing
    rating
    discs
    media
    bought
    cost
  }
}
```

Returns.

```bash
{
  "data": {
    "record": {
      "id": 1172,
      "name": "Blonde On Blonde",
      "field": "Rock",
      "recorded": 1966,
      "label": "Columbia",
      "pressing": "Am",
      "rating": "****",
      "discs": 1,
      "media": "CD",
      "bought": "17-02-1999",
      "cost": 14
    }
  }
}
```

Add an Artist

```bash
mutation {
  addArtist(firstname: "Alan", lastname: "Robson", name: "Alan Robson", biography: "Alan is a Country & Western singer.") {
    id
    firstname
    lastname
    name
    biography
  }
}
```

Returns.

```bash
{
  "data": {
    "addArtist": {
      "id": 617,
      "firstname": "Alan",
      "lastname": "Robson",
      "name": "Alan Robson",
      "biography": "Alan is a Country & Western singer."
    }
  }
}
```

**Note:** this works but isn't bringing back a correct ``id``.

## Documentation

### Root Query

> record(id: Int): Record       
> A Single Record       
>       
> records: [Record]     
> List of All Records       
>       
> artists: [Artist]     
> List of All artists       
>       
> artist(id: Int): Artist       
> A Single Artist

### Root Mutation

> addRecord(        
> artistId: Int!        
> name: String!     
> field: String!        
> recorded: Int!        
> label: String!        
> pressing: String!     
> rating: String!       
> discs: Int!       
> media: String!        
> bought: String!       
> cost: Float!      
> review: String        
> ): Record     
>       
> Add a record      
>       
> addArtist(        
> firstname: String!        
> lastname: String!     
> name: String!     
> biography: String!        
> ): Artist     
>       
> Add an artist
