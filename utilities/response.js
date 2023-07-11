const sendResponse = (res, success, message, data = null, status = 200) => {
    res.status(status).json({ success, message, data });
}

module.exports = sendResponse;