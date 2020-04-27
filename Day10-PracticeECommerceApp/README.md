## E-Commerce API
Developing an e-commerce API

Key points:
- CRUD products
- CRUD cart
- CRUD users(remember to register companies)
- Checkout(handle by maybe stripe)

# User Stories
| Method | Endpoint | Description| status | 
| ------- | ------ | ------ | ----- | 
| POST | /users/register | Create a new user | ✔️ | 
| POST | /users/login | Login the existing user | ✔️ |
| GET | /users | Get all users(admin) | ✔️ |
| GET | /users/:_id | Get a single user(loggedIn user/admin) | ✔️ |
| PATCH | /users/activate/:email | verify account/email | ✔️ |
| PATCH | /users/password-reset | Allow a user to reset a passwrd| ✔️ |
| PATCH | /users/:_id | Update an existing user | ✔️ |
| DELETE | /users/:_id | Delete a user | ✔️ |
| - | - | - | - |
| POST | /products | Create a new product |  ✅ |
| GET | /products | Get/Fetch all products |  ✅ |
| GET | /products/:_id | Get a single product |  ✅ |
| GET |/products/:_userId | Get all products added by specific user | ✅ |
| UPDATE | /products/:_id | Replace a specific product | 
| PATCH | /products/:_id | Update a specific product |  ✅ |
| DELETE | /products/:_id | Delete a specific product |  ✅ |
| DELETE | /products/user/:_userId | Delete Many products added by a specific user | ✅ |
| - | - | - |
| POST | /buy | Allow a single user to buy a single products(Adds to cart)| 
| - | - | - |
| POST | /product/rate | User who has bought a product to rate |
| GET | /product/rate/:_productId | Get all rates for a single product |
| GET | /product/rate/:_productId/:userId | Get a rate for a single person on a single product |
| - | - | - |
| POST | /checkout | Create a checkout page |
| - | - | - |
| POST | /cart | Buy products in a cart |
| GET | /cart/:_userId | Get all items in a cart according to the user |
| PATCH | /cart:_userId | Update the cart of a user |
| DELETE | /cart/:_id | Delete items in a cart
