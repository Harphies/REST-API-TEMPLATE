## Node-Express for Mongodb REST API data querries

- Schemas
- Queries/Operations

## Resources

- [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
- [Db design](https://github.com/jdmedlock/dbdesign)
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
- custom \_id
- ordered Inserts
- Storage Engine & writeConcern
- Atomocity
- mongodb data types
- data types and limit
- Relationship options
  - Embedded
  - Reference (if changes are needed often everywhere, reference method is preferable)
- Merging reference relation using lookup
- Indexes
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

## Schema Modelling Rules

- As general rule, try to embed unless you have reasons not to do so.
- If the objects you are going to embed may be accessed in a isolated way (it makes sense to access it out of the document context) you have a reason for not embedding.
- If the array with embedded objects may grow in an unbounded way, you have another reason for not embedding. As a general rule, we should not embed more than a couple of hundreds of documents/objects neither more than a couple of thousands ObjectIDs.
- Denormalize one or several fields of a document from the many side into the array in the one side (One-to-Many relationship) can save us some extra queries (application-level joins). IMO, denormalization is one of the keys to get the most out of this kind of databases. But, denormalization only makes sense if the denormalized field/s will be seldom updated. Otherwise, finding and updating all the instances is likely to overwhelm the savings that we get from denormalizing. So that, consider the read/write ratio for the field/s before denormalizing.
- Don't be afraid of application-level joins. With the right indexing, they are barely more expensive than server-level joins. (Update: last MongoDB versions includes the \$lookup operator that allows us to do server-level JOINS, concretely LEFT OUTER JOINS)
- And remember: Design your schemas the way through fit as well as possible your application's data access patterns. We want to structure our data to match the ways that our application queries and updates it.

## Things to consider for modelling relations

- Use embedded documents if you got one-to-one or one-to-many relationships and no app or data size reason to split.
- Use reference if data amount/size or application needs require it or for many-to-many relations.

## CRUD Operations

- Create: Document creation and Importing documents
  - insertOne()
  - insertMany()
  - insert()
  - mongo import
- Read : Reading/Quering documents with Operation : Accessing the required data efficiently
  - Methods, Filters:range filter and Operators
  - Query Operators
    - Comparison
    - Evaluation
    - Logical
    - Array
    - Element
    - Comments
    - Geospatial
  - Query Operator is for locating data
  - Projection Operators is to modify data presentation
    - \$
    - \$ elemMatch
    - \$meta
    - \$slice
- Update
  - updateOne
  - uodateMany
  - Array Update operators
  - upsert
  - update operators
- Delete

  - deleteOne
  - deleteMany

- Indexes: It helps Retrive data efficiently because the query only have to run on the subset of all documents.
- Using Indexes for sorting; especially for large documents query
