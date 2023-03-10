const axios = require('axios');

module.exports = async function (req, res, next){
  try{
    const {data} = await axios.post('http://localhost:3001/api/users/validate', {} , {
      headers: {
        'x-access-token':req.headers['x-access-token']
      }
    });
    req.user = data.decoded;
    next();
  } catch(ex){
    if(ex.response?.status===401)
      res.status(401).send('Invalid token.');
    else if(ex.response?.status)
      res.status(ex.response.status).send('Something Went Wrong');
    else
      res.status(500).send('Internal Server Error');
  }
};