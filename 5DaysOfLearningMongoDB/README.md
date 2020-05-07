
MongoDB uses BSON behind the scenes. This is achieved by mongo drivers

## Restrictions
### Database Naming Restrictions
- Case sensitive
- Cannot contain these special characters `/\. "$*<>:|?`
- **Length** - cannot be empty and must have fewer than 64 characters.

### Collection NAming Restrictions
Collection names should begin with an underscore or a letter character, and cannot:
- contain the $.
- be an empty string (e.g. "").
- contain the null character.
- begin with the system(.) prefix. (Reserved for internal use.)

### Field Naming Restrictions
- Field names cannot contain the null character.
- Top-level field names cannot start with the dollar sign ($) character.

## Commands
- `show dbs` - show all databases
- `show collections`
- `show users`
- `show profile`
- `show logs`
- `show log[name]`
- `use dbname` - switch to a database name
- `db.collectionname.insertOne({})` - insert an object into the collection name on the db name
- `db.collectionname.insertMany([{}, {}])` - insert many objects/documents into the collection name on the db name
- `db.collectionName.updateOne({id}, {})` - updates one document
- `db.collectionName.updateMany({id}, {})` - updates many documents
- `db.collectionName.update({id}, {})` - Overrides all existing data - same as `db.collectionName.replaceOne({}, {})`
- Projection i.e. select (name) from collectionName will be `db.collectionName.find({}, {name: 1, _id: 0})` means {} - find everything in the collection, 1-fetch true, 0-fetch false(don't fetch the _id fields)
- Embed documents - upto 100 levels of nesting
- Resetting DB - `db.dropDatabase()`, `db.myCollection.drop()`
- `$set`
- `help` - access help commands/instructions

## Import & Export DB data
- `mongodbimport filepathNAmetoImport  -d databasename -c collectionName --jsonArray`(format) `--drop`(optional to drop existing data)

