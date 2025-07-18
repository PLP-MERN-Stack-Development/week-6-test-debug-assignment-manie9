const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const bugController = require('../../src/controllers/bugController');
const Bug = require('../../src/models/bugModel');

jest.mock('../../src/models/bugModel');

describe('Bug Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getBugs returns all bugs', async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const bugs = [{ title: 'Bug 1' }, { title: 'Bug 2' }];
    Bug.find.mockResolvedValue(bugs);

    await bugController.getBugs(req, res);

    expect(Bug.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(bugs);
  });

  test('getBugById returns a bug by id', async () => {
    const req = { params: { id: '123' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const bug = { title: 'Bug 1' };
    Bug.findById.mockResolvedValue(bug);

    await bugController.getBugById(req, res);

    expect(Bug.findById).toHaveBeenCalledWith('123');
    expect(res.json).toHaveBeenCalledWith(bug);
  });

  test('createBug creates a new bug', async () => {
    const req = {
      body: {
        title: 'New Bug',
        description: 'Description',
        status: 'open',
        priority: 'medium',
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const saveMock = jest.fn().mockResolvedValue(req.body);
    Bug.mockImplementation(() => ({ save: saveMock }));

    await bugController.createBug(req, res);

    expect(saveMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });
});
