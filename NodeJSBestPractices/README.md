## Tips
- Project Structure
    - [Structure solutions](https://github.com/Nicanor008/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md) by components
    - [Layer components](https://github.com/Nicanor008/nodebestpractices/blob/master/sections/projectstructre/createlayers.md), keep Express within its boundaries
    - Wrap common utilities as npm packages(private/public)
    - [Separate Express 'app' and 'server'](https://github.com/Nicanor008/nodebestpractices/blob/master/sections/projectstructre/separateexpress.md)
    - [Use environment aware, secure and hierarchical config](https://github.com/Nicanor008/nodebestpractices/blob/master/sections/projectstructre/configguide.md)
- Error Handling Practices
    - [Use Async-Await or promises for async error handling](https://github.com/Nicanor008/nodebestpractices/blob/master/sections/errorhandling/asyncerrorhandling.md)Node.js callback style, function(err, response), is a promising way to un-maintainable code due to the mix of error handling with casual code, excessive nesting, and awkward coding patterns
    - [Use only the built-in Error object]