const error = (err, req, res, _next) => {
    console.error(err);
    res.status(500).end();
};

module.exports = error;
