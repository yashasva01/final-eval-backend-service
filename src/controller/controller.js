const contentService = require('../services/contentServices');

async function createContentType ( req, res ) {
  const { name } = req.body;
  const response = await contentService.createContentType(name); 
  res.send(response.message).status(response.status);
}

module.exports = {
  createContentType
};