const controller = require('../../src/controller/controller');
const contentService = require('../../src/services/contentServices');

describe('Controller', () => {
  it('should create content type', async () => {
    const req = {
      body: {
        name: 'test'
      }
    };
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    jest.spyOn(contentService, 'createContentType').mockResolvedValue({ message: {message: 'Content type created successfully', data: 'test'} , status: 200 });
    await controller.createContentType(req, res);
    expect(res.send).toBeCalled();
    expect(res.status).toBeCalled();
  });
  it('should create content field', async () => {
    const req = {
      body: {
        name: 'test',
        field: 'test'
      }
    };
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    jest.spyOn(contentService, 'createContentField').mockResolvedValue({ message:'Content field created successfully', status: 200 });
    await controller.createContentField(req, res);
    expect(res.send).toBeCalled();
    expect(res.status).toBeCalled();
  });
  it('should remove content field', async () => {
    const req = {
      body: {
        name: 'test',
        field: 'test'
      }
    };
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    jest.spyOn(contentService, 'removeContentField').mockResolvedValue({ message:'Content field removed successfully', status: 200 });
    await controller.removeContentField(req, res);
    expect(res.send).toBeCalled();
    expect(res.status).toBeCalled();
  });
  it('should get content type', async () => {
    const req = {};
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    jest.spyOn(contentService, 'getContentType').mockResolvedValue({ message:{message: 'Content type retrieved successfully', data: 'test'}, status: 200 });
    await controller.getContentType(req, res);
    expect(res.send).toBeCalled();
    expect(res.status).toBeCalled();
  });
  it('should get content field', async () => {
    const req = {
      body: {
        name: 'test'
      }
    };
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    jest.spyOn(contentService, 'getContentField').mockResolvedValue({ message:{message: 'Content field retrieved successfully', data: 'test'}, status: 200 });
    await controller.getContentField(req, res);
    expect(res.send).toBeCalled();
    expect(res.status).toBeCalled();
  });
  it('should edit content type name', async () => {
    const req = {
      body: {
        oldName: 'test',
        newName: 'test'
      }
    };
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    jest.spyOn(contentService, 'editContentTypeName').mockResolvedValue({ message:'Content type name edited successfully', status: 200 });
    await controller.editContentTypeName(req, res);
    expect(res.send).toBeCalled();
    expect(res.status).toBeCalled();
  });
  it('should add content instance', async () => {
    const req = {
      body: {
        name: 'test',
        data: 'test'
      }
    };
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    jest.spyOn(contentService, 'addContentInstance').mockResolvedValue({ message:'Content instance added successfully', status: 200 });
    await controller.addContentInstance(req, res);
    expect(res.send).toBeCalled();
    expect(res.status).toBeCalled();
  });
  it('should get all instances of content type', async () => {
    const req = {
      body: {
        name: 'test'
      }
    };
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    jest.spyOn(contentService, 'getAllInstancesOfContentType').mockResolvedValue({ message:{message: 'Content instances retrieved successfully', data: 'test'}, status: 200 });
    await controller.getAllInstancesOfContentType(req, res);
    expect(res.send).toBeCalled();
    expect(res.status).toBeCalled();
  });
  it('should edit content instance', async () => {
    const req = {
      body: {
        name: 'test',
        id: 'test',
        data: 'test'
      }
    };
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    jest.spyOn(contentService, 'editContentInstance').mockResolvedValue({ message:'Content instance edited successfully', status: 200 });
    await controller.editContentInstance(req, res);
    expect(res.send).toBeCalled();
    expect(res.status).toBeCalled();
  });
  it('should delete content instance', async () => {
    const req = {
      body: {
        name: 'test',
        id: 'test'
      }
    };
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    jest.spyOn(contentService, 'removeContentInstance').mockResolvedValue({ message:'Content instance deleted successfully', status: 200 });
    await controller.removeContentInstance(req, res);
    expect(res.send).toBeCalled();
    expect(res.status).toBeCalled();
  });
});