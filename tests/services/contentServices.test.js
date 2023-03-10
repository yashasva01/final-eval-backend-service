const contentService = require('../../src/services/contentServices');
const db = require('../../src/models');

describe('Content Services', () => {
  it('should create content type', async () => {
    const name = 'test';
    jest.spyOn(db.contentType, 'findOne').mockResolvedValue(null);
    jest.spyOn(db.contentType, 'create').mockResolvedValue({ dataValues: { typeName: name, typeFields: [] } });
    const response = await contentService.createContentType(name);
    expect(response.message).toEqual({message: 'Content type created successfully', data: { typeName: name, typeFields: [] }});
    expect(response.status).toBe(200);
  });
  it('should not create content type if it already exists', async () => {
    const name = 'test';
    jest.spyOn(db.contentType, 'findOne').mockResolvedValue({ dataValues: { typeName: name, typeFields: [] } });
    const response = await contentService.createContentType(name);
    expect(response.message).toEqual('Content type already exists');
    expect(response.status).toBe(400);
  });
});
describe('Content Services', () => {
  it('should create content field', async () => {
    const name = 'test';
    const field = 'test';
    jest.spyOn(db.contentType, 'findOne').mockResolvedValue({ dataValues: { typeName: name, typeFields: [] } });
    jest.spyOn(db.contentType, 'update').mockResolvedValue({ dataValues: { typeName: name, typeFields: [field] } });
    const response = await contentService.createContentField(name, field);
    expect(response.message).toEqual('Content field created successfully');
    expect(response.status).toBe(200);
  });
  it('should not create content field if content type does not exist', async () => {
    const name = 'test';
    const field = 'test';
    jest.spyOn(db.contentType, 'findOne').mockResolvedValue(null);
    const response = await contentService.createContentField(name, field);
    expect(response.message).toEqual('Content type does not exist');
    expect(response.status).toBe(400);
  });
  it('should not create content field if it already exists', async () => {
    const name = 'test';
    const field = 'test';
    jest.spyOn(db.contentType, 'findOne').mockResolvedValue({ dataValues: { typeName: name, typeFields: [field] } });
    const response = await contentService.createContentField(name, field);
    expect(response.message).toEqual('Content field already exists');
    expect(response.status).toBe(400);
  });
});
describe('Content Services', () => {
  it('should remove content field', async () => {
    const name = 'test';
    const field = 'test';
    jest.spyOn(db.contentType, 'findOne').mockResolvedValue({ dataValues: { typeName: name, typeFields: [field] } });
    jest.spyOn(db.contentType, 'update').mockResolvedValue({ dataValues: { typeName: name, typeFields: [] } });
    const response = await contentService.removeContentField(name, field);
    expect(response.message).toEqual('Content field removed successfully');
    expect(response.status).toBe(200);
  });
  it('should not remove content field if content type does not exist', async () => {
    const name = 'test';
    const field = 'test';
    jest.spyOn(db.contentType, 'findOne').mockResolvedValue(null);
    const response = await contentService.removeContentField(name, field);
    expect(response.message).toEqual('Content type does not exist');
    expect(response.status).toBe(400);
  });
  it('should not remove content field if it does not exist', async () => {
    const name = 'test';
    const field = 'test';
    jest.spyOn(db.contentType, 'findOne').mockResolvedValue({ dataValues: { typeName: name, typeFields: [] } });
    const response = await contentService.removeContentField(name, field);
    expect(response.message).toEqual('Content field does not exist');
    expect(response.status).toBe(400);
  });
});
describe('Content Services', () => {
  it('should create content', async () => {
    const name = 'test';
    const field = {test: 'test'};
    jest.spyOn(db.contentType, 'findOne').mockResolvedValue({ dataValues: { typeName: name, typeFields: ['test'] } });
    jest.spyOn(db.contentType, 'update').mockResolvedValue({ dataValues: { contentName: name, contentFields: field } });
    const response = await contentService.createContentField(name, field);
    expect(response.message).toEqual('Content field created successfully');
    expect(response.status).toBe(200);
  });
  it('should not create content if content type does not exist', async () => {
    const name = 'test';
    const field = {test: 'test'};
    jest.spyOn(db.contentType, 'findOne').mockResolvedValue(null);
    const response = await contentService.createContentField(name, field);
    expect(response.message).toEqual('Content type does not exist');
    expect(response.status).toBe(400);
  });
  it('should not create content if it already exists', async () => {
    const name = 'test';
    const field = {test: 'test'};
    jest.spyOn(db.contentType, 'findOne').mockResolvedValue({ dataValues: { contentName: name, contentFields: field } });
    const response = await contentService.createContentField(name, field);
    expect(response.message).toEqual('Internal server error');
    expect(response.status).toBe(500);
  });
});
describe('Content Services', () => {
  it('should  not get content', async () => {
    const name = 'test';
    const field = {test: 'test'};
    jest.spyOn(db.contentType, 'findAll').mockResolvedValue({ dataValues: { contentName: name, contentFields: field } });
    const response = await contentService.getContentType(name);
    expect(response.message).toEqual('Internal server error');
    expect(response.status).toBe(500);
  });
  it('should not get content if content type does not exist', async () => {
    const name = 'test';
    jest.spyOn(db.contentType, 'findAll').mockResolvedValue(null);
    const response = await contentService.getContentType(name);
    expect(response.message).toEqual('Internal server error');
    expect(response.status).toBe(500);
  });
});