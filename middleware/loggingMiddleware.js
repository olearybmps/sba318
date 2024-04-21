const loggingMiddleware = (req, res, next) => {
    // Log the request details
    // The current timestamp (new Date().toISOString()), the HTTP method (req.method), and the requested URL (req.url)
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Log the request body, if applicable
    // Checks if request has req.body. If true, log request body 
    if (Object.keys(req.body).length > 0) {
        console.log('Request Body:', req.body);
    }

    // Proceed to the next middleware or route handler
    next();
};

// Export middleware
module.exports = loggingMiddleware;