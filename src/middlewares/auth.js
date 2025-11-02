const adminAuth = (req, res, next) => {
    const token = 'xyz';
    const isAdminAuthorized = token === 'xyz';

    if(!isAdminAuthorized) {
        res.status(401).send("Unauthorized Request");
    }
    next();
}

module.exports = {
    adminAuth,
}