## Node-Express for Mongodb REST API data querries

- Schemas
- Queries/Operations

## Resources

- [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
- [SQL vs MongoDb mapping](https://docs.mongodb.com/manual/reference/sql-comparison/)
- [Awesome MongoDb](https://github.com/ramnes/awesome-mongodb)
- [Mongoose schema types](https://mongoosejs.com/docs/2.7.x/docs/schematypes.html)
- [Mongoose querry](https://mongoosejs.com/docs/queries.html)
- [MongoDB cheat sheet](https://blog.codecentric.de/files/2012/12/MongoDB-CheatSheet-v1_0.pdf)
- [mongo db data types](https://www.tutorialspoint.com/mongodb/mongodb_datatype.htm)
- [Mongodb documentation](http://mongodb.github.io/node-mongodb-native/3.5/api/)
- [Mongodb supported BSON types](https://docs.mongodb.com/manual/reference/bson-types/)
- [Schema validation](https://docs.mongodb.com/manual/core/schema-validation/)

## SQl -> Mongodb Mapping

- Database -> database
- Collections -> Tables
- Documents/BSON -> Rows
- Fiedls -> Columns
- Table Joins -> Embedded documents
- index -> Index
- Primary key -> Primary key
- Primary key is automatically set to \_id in mongodb
- Aggregrate(e.g group by) ->aggregrate framework

## MongoDB Layered architecture

- Database
  - Collections
    - documents
      - Fields

## Useful MongoDb concepts

- Nested/Embedded documents and Array approximate of 100 steps
- Projections
- Accesing structured data
- Filters and Operators for efficient retrieving
- mongodb data types
- data types and limit
- Relationship options
  - Embedded
  - Reference (if changes are needed often everywhere, reference method is preferable)
- Merging reference relation using lookup
- Schema validation
  - validation levels
    - strict
    - moderate
  - validation actions
    - error
    - warn

## Things to consider for Data modelling and structuring

- In which format will you fetch your data
- How often do you fetch data and change your data
- How much data will you save (and how big it is)
- How is your data related
- Will duplicate hurts you (many Updates)
- Will you hit data or storage limits

## Things to consider for modelling

- Schema should be based on your application need
- Important factors are:Read and Write frequency, relations,amount(size) of data

## Things to consider for modelling relations

- Use embedded documents if you got one-to-one or one-to-many relationships and no app or data size reason to split.
- Use reference if data amount/size or application needs require it or for many-to-many relations.

## CRUD Operations
