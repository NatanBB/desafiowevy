import { login } from '../services/authService';
import { prisma } from '../lib/prisma';
import { FastifyRequest, FastifyReply } from 'fastify';

jest.mock('../lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
    },
  },
}));

describe('login', () => {
  it('should return a token for valid credentials', async () => {
    const mockUser = { user_id: '123', username: 'testuser', password: 'password123' };
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

    const mockJwtSign = jest.fn().mockReturnValue('mocked-token');
    const mockRequest = {
      body: {
        username: 'testuser',
        password: 'password123',
      },
      server: {
        jwt: {
          sign: mockJwtSign,
        },
      },
    } as unknown as FastifyRequest;

    const mockReply = {
      send: jest.fn(),
    } as unknown as FastifyReply;

    await login(mockRequest, mockReply);

    expect(mockJwtSign).toHaveBeenCalledWith({ user_id: '123' });
    expect(mockReply.send).toHaveBeenCalledWith({ token: 'mocked-token' });
  });

  it('should return 401 for invalid credentials', async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    const request = {
      body: {
        username: 'invaliduser',
        password: 'invalidpassword',
      },
    } as FastifyRequest;

    const reply = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as FastifyReply;

    await login(request, reply);

    expect(reply.status).toHaveBeenCalledWith(401);
    expect(reply.send).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });
});
