const contentService = require('../services/contentServices');

async function createContentType ( req, res ) {
  const { name } = req.body;
  const response = await contentService.createContentType(name); 
  res.send(response.message).status(response.status);
}

async function createContentField (req, res) {
  const { name, field } = req.body;
  const response = await contentService.createContentField(name, field);
  res.send(response.message).status(response.status);
}

module.exports = {
  createContentType,
  createContentField
};