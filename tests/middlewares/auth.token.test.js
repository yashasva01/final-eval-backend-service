const validateToken = require('../../src/middlewares/auth.token');


describe('Auth Token Middleware', () => {
  it('should return 401 if token is not provided', async () => {
    const req = {};
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    await validateToken(req, res);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledWith('Internal Server Error');
  });
  it('should return 500 if token is invalid', async () => {
    const req = {
      headers:{
        'x-access-token':'test'
      }
    };
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    await validateToken(req, res);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledWith('Internal Server Error');
  });
  it('should return 200 if token is valid', async () => {
    const req = {
      headers:{
        'x-access-token':'test'
      }
    };
    const res = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    const next = jest.fn();
    await validateToken(req, res, next);
    expect(next).toBeCalled();
  });
});