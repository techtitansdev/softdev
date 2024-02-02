// @ts-nocheck
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/v1/tasks', (req, res, ctx) => {
    const mockTask = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      address: 'Jaro, Iloilo City',
      password: 'JohnDoe@34*',
    };

    return res(
      ctx.status(201),
      ctx.json({ tasks: mockTask })
    );
  }),
];
