

# Response
- **res.send()**

    The signature of this method looks like this: `res.send([body])` where the body can be any of the following: Buffer, String, an Object and an Array. 
    
    This method automatically sets the Content-Type response header as well based on the argument passed to the send() method, so for example if the [body] is a Buffer the Content-Type will be set to application/octet-stream unless of course we programmatically set it to be something else.

- **res.json()**

    Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().
    
    It has some functionality that is related to JSON objects that we can't access when using res.send(). It can format the returned JSON data by applying two options:
    ```
    // property transformation rules
    app.set('json replacer', replacer); 

    // number of spaces for indentation
    app.set('json spaces', 2); 
    ```

    These two options are collected and passed to the JSON.stringify()

    `JSON.stringify(object, replacer, space )`
    
    Once this method is called, the res.json() method will then call res.send() as well under the hood.

- **res.end()**

    Ends the response process. This method actually comes from Node core, specifically the response.end() method of http.ServerResponse.Use to quickly end the response without any data. `e.g. res.status(404).end()`

- **res.sendStatus()**

    Sets the response HTTP status code to statusCode and send its string representation as the response body.

    ```
    res.sendStatus(200) // equivalent to res.status(200).send('OK')
    ```


- **res.set()**

    Sets the response’s HTTP header field to value
    `res.set('Content-Type', 'text/plain')`

- **res.cookie(name, value[, options])**

    Sets cookie name to value.

- **res.append(field, [, value])**

    Appends the specified value to the HTTP response header field. If the header is not already set, it creates the header with the specified value. The value parameter can be a string or an array.
    ```
    res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
    res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
    res.append('Warning', '199 Miscellaneous warning')
    ```

- **res.locals**(Property)
    
    An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that request / response cycle (if any). 
    
    This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on.
    ```
    app.use(function (req, res, next) {
        res.locals.user = req.user
        res.locals.authenticated = !req.user.anonymous
        next()
    })
    ```

# App
- **app.locals**(Property)

    The app.locals object has properties that are local variables within the application.
