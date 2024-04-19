const validatePlayerMiddleware = (req, res, next) => {
    const { name, age } = req.body;

    // Check if name and age are provided
    if (!name || !age) {
        return res.status(400).json({ error: 'Name and age are required' });
    }

    // Check if age is a positive integer
    if (!Number.isInteger(age) || age <= 0) {
        return res
            .status(400)
            .json({ error: 'Age must be a positive integer' });
    }

    // If validation passes, proceed to the next middleware or route handler
    next();
};

module.exports = validatePlayerMiddleware;