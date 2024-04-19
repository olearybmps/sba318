const loggingMiddleware = (req, res, next) => {
    // Log the request details
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Log the request body, if applicable
    if (Object.keys(req.body).length > 0) {
        console.log('Request Body:', req.body);
    }

    // Proceed to the next middleware or route handler
    next();
};

module.exports = loggingMiddleware;