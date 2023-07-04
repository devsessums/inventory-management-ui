const getUrl = (p) => {
    return process.env.REACT_APP_BACKEND_ADDRESS + p;
};


module.exports = { getUrl };
