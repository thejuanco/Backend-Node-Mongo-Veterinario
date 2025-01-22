const checkAuth = (req, res, next) => {
    console.log('Checking');
    next();
}

export default checkAuth