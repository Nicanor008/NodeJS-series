# Error Handling in NodeJS
## Types of Errors
- Technical /Network errors e.g db failure
- "Expected errors" e.g. file can't read, DB execution fails(Retry)
- Bugs/Logical errors e.g. object doesn't exist


## Note
If error is thrown, in **synchronous code** use try-catch block and for **asycnhronous code** use then()-catch() otherwise just throw an errror e.g. ` throw new Error('some error message')`

## Docs 
- https://expressjs.com/en/guide/error-handling.html
