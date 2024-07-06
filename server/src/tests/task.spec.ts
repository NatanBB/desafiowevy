import { createTask, deleteTask, getAllTasks, getUserTasks, updateTask } from '../services/taskService';
import { prisma } from '../lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

jest.mock('../lib/prisma', () => ({
  prisma: {
    task: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
  },
}));

describe('getAllTasks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all tasks successfully', async () => {
    const mockTasks = [
      { task_id: '1', title: 'Task 1', description: 'Description 1', createdAt: new Date(), user_id: 'user1', completedOn: null },
      { task_id: '2', title: 'Task 2', description: 'Description 2', createdAt: new Date(), user_id: 'user2', completedOn: new Date() },
    ];

    (prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks);

    const request = {
      params: {},
    } as any;

    const response = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as any;

    await getAllTasks(request, response);

    expect(response.send).toHaveBeenCalledWith(mockTasks);
  });

  it('should handle errors when fetching tasks', async () => {
    const mockError = new Error('Database error');
    (prisma.task.findMany as jest.Mock).mockRejectedValue(mockError);

    const request = {
      params: {},
    } as any;

    const response = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as any;

    await getAllTasks(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledWith({ error: 'An error occurred while fetching tasks' });
  });
});

describe('getUserTasks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch tasks for a specific user successfully', async () => {
    const mockUserId = 'user123';
    const mockTasks = [{ task_id: '1', title: 'Task 1', user_id: mockUserId }, { task_id: '2', title: 'Task 2', user_id: mockUserId }];
    (prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks);

    const request = {
      params: { user_id: mockUserId },
      server: { log: { error: console.error } }, // Mock server.log to avoid 'undefined' error
    } as unknown as FastifyRequest<{ Params: { user_id: string } }>;

    const response = {
      send: jest.fn(),
    } as unknown as FastifyReply;

    await getUserTasks(request, response);

    expect(response.send).toHaveBeenCalledWith(mockTasks);
  });

  it('should handle errors when fetching user tasks', async () => {
    const mockUserId = 'user123';
    const mockError = new Error('Database error');
    (prisma.task.findMany as jest.Mock).mockRejectedValue(mockError);

    const request = {
      params: { user_id: mockUserId },
      server: { log: { error: console.error } }, // Mock server.log to avoid 'undefined' error
    } as unknown as FastifyRequest<{ Params: { user_id: string } }>;

    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    await getUserTasks(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledWith({ error: 'An error occurred while fetching tasks' });
  });
});

describe('createTask', () => {
  it('should create a new task successfully', async () => {
    const mockRequest = {
      body: {
        title: 'New Task',
        description: 'Description of new task',
        user_id: 'user123',
        createdAt: new Date().toISOString(),
      },
    } as FastifyRequest;

    const mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    const createdTask = {
      task_id: 'task123',
      title: 'New Task',
      description: 'Description of new task',
      user_id: 'user123',
      createdAt: new Date(),
    };
    (prisma.task.create as jest.Mock).mockResolvedValue(createdTask);

    await createTask(mockRequest, mockReply);

    expect(prisma.task.create).toHaveBeenCalledWith({
      data: {
        title: 'New Task',
        description: 'Description of new task',
        user_id: 'user123',
        createdAt: expect.any(Date),
      },
    });
    expect(mockReply.status).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith(createdTask);
  });
});

describe('updateTask', () => {
  it('should update a task successfully', async () => {
    const mockRequest = {
      body: {
        title: 'Updated Task',
        description: 'Updated description',
        completedOn: null,
        createdAt: new Date().toISOString(),
        task_id: 'task123',
        user_id: 'user123',
      } as {
        title: string;
        description: string;
        completedOn: string | null;
        createdAt: string;
        task_id: string;
        user_id: string;
      },
      params: {
        task_id: 'task123',
      },
    } as FastifyRequest<{ Params: { task_id: string } }>;

    const mockReply = {
      send: jest.fn(),
    } as unknown as FastifyReply;

    const existingTask = {
      task_id: 'task123',
      title: 'Old Task',
      description: 'Old description',
      completedOn: null,
      createdAt: new Date(),
      user_id: 'user123',
    };
    (prisma.task.findUnique as jest.Mock).mockResolvedValue(existingTask);

    const updatedTask = {
      ...existingTask,
      title: 'Updated Task',
      description: 'Updated description',
      createdAt: new Date((mockRequest.body as any).createdAt),
    };
    (prisma.task.update as jest.Mock).mockResolvedValue(updatedTask);

    await updateTask(mockRequest, mockReply);

    expect(prisma.task.update).toHaveBeenCalledWith({
      where: {
        task_id: 'task123',
      },
      data: {
        title: 'Updated Task',
        description: 'Updated description',
        completedOn: null,
        createdAt: expect.any(Date),
        task_id: 'task123',
        user_id: 'user123',
      },
    });
    expect(mockReply.send).toHaveBeenCalledWith(updatedTask);
  });
});

describe('deleteTask', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a task successfully', async () => {
    const mockTaskId = 'task123';
    const mockRequest = {
      params: { task_id: mockTaskId },
    } as unknown as FastifyRequest<{ Params: { task_id: string } }>;

    const mockReply = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as FastifyReply;

    // Mocking the existing task
    (prisma.task.findUnique as jest.Mock).mockResolvedValue({ task_id: mockTaskId });

    await deleteTask(mockRequest, mockReply);

    expect(prisma.task.findUnique).toHaveBeenCalledWith({
      where: { task_id: mockTaskId },
    });
    expect(prisma.task.delete).toHaveBeenCalledWith({
      where: { task_id: mockTaskId },
    });
    expect(mockReply.send).toHaveBeenCalledWith({ deleted: true });
  });

  it('should handle task not found error', async () => {
    const mockTaskId = 'task123';
    const mockRequest = {
      params: { task_id: mockTaskId },
    } as unknown as FastifyRequest<{ Params: { task_id: string } }>;

    const mockReply = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as FastifyReply;

    (prisma.task.findUnique as jest.Mock).mockResolvedValue(null);

    await deleteTask(mockRequest, mockReply);

    expect(prisma.task.findUnique).toHaveBeenCalledWith({
      where: { task_id: mockTaskId },
    });
    expect(prisma.task.delete).not.toHaveBeenCalled();
    expect(mockReply.status).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({ error: 'Task Not Found.' });
  });

  it('should handle error deleting task', async () => {
    const mockTaskId = 'task123';
    const mockRequest = {
      params: { task_id: mockTaskId },
    } as unknown as FastifyRequest<{ Params: { task_id: string } }>;

    const mockReply = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as FastifyReply;

    (prisma.task.findUnique as jest.Mock).mockResolvedValue({ task_id: mockTaskId });
    (prisma.task.delete as jest.Mock).mockRejectedValue(new Error('Database error'));

    await deleteTask(mockRequest, mockReply);

    expect(prisma.task.findUnique).toHaveBeenCalledWith({
      where: { task_id: mockTaskId },
    });
    expect(prisma.task.delete).toHaveBeenCalledWith({
      where: { task_id: mockTaskId },
    });
    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({ error: 'Error deleting task.' });
  });
});