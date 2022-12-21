const boom = require('@hapi/boom');

function notFoundHandler(req, res){
    const {
        output: {statusCode, payload}
    } = boom.notFound();
    // eslint-disable-next-line no-console
    console.log(payload)
    res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;