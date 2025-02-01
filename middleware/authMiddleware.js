const checkAuth = (req, res, next) => {

    if(req.headers.authorization && req.headers.authorization.startswith('Bearer')){
        console.log('Si tiene el token con bearer')
    }

    const error = new Error('Token no valido o inexistente')
    res.status(403).json({msg: error.message})

    next();
}

export default checkAuth