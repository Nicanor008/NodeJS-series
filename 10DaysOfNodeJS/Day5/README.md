# Non-relational Databases
e.g. Apache CouchDB, Google DataStore, AWS Dynamo DB, MongoDB

# MongoDB
Named after mongodb company. The name came from **humongous**  meaning extraordinarily large.

MongoDB can store lots of data. For large scale apps
They are schemaless

# Relevance to Relational DAtabase
- Database - Database
- Tables - Collections
- Rows - Documents
- Column - Field
- Joining -	Linking & Embedding
- Partition - Sharding (Range Partition)
- Replication -	ReplSet

Uses JSON to store Data in Documents. Before being converted to JSON, MongoDB first converts to BSON format
Allows nested of objects in documents

# Relations in Mongo DB
Can be achieved in two ways:
- Nesting or embedding Documents
- Referencing data - includes most of duplication

# Pros
- Document oriented
- High performance
- High availability — Replication
- High scalability – Sharding
- Dynamic — No rigid schema.
- Flexible – field addition/deletion have less or no impact on the application
- Heterogeneous Data
- No Joins
- Distributed
- Data Representation in JSON or BSON
- Geospatial support
- Easy Integration with BigData Hadoop
- Document-based query language that’s nearly as powerful as SQL
- Cloud distributions such as AWS, Microsoft, RedHat,dotCloud and SoftLayer etc:-. In fact, MongoDB is built for the cloud. Its native scale-out architecture, enabled by ‘sharding,’ aligns well with the horizontal scaling and agility afforded by cloud computing.

# Cons
- A downside of NoSQL is that most solutions are not as strongly ACID-compliant (Atomic, Consistency, Isolation, Durability) as the more well-established RDBMS systems.
- Complex transaction
- No function or stored procedure exists where you can bind the logic

# Good For
- E-commerce product catalog.
- Blogs and content management.
- Real-time analytics and high-speed logging, caching, and high scalability.
- Configuration management.
- Maintaining location-based data — Geospatial data.
- Mobile and social networking sites.
- Evolving data requirements.
- Loosely coupled objectives — the design may change by over time.

# Not So Good For
(systems/apps require intensive use CPU)
- Highly transactional systems or where the data model is designed up front.
- Tightly coupled systems

# Note
- Mongo is a beast when it comes to features like scalability, load balancing, data center awareness, failovers, replication and distribution but not intergrity checks.

# References
- https://dzone.com/articles/why-mongodb
- https://docs.mongodb.com/manual/