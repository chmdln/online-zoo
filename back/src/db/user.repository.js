import { prisma } from './client.js';

export const userRepository = {
  createUser: (data) => 
    prisma.user.create({ 
        data 
    }),

  findByUuid: (uuid) => 
    prisma.user.findUnique({ 
        where: { uuid } 
    }),

  findByLogin: (username) => 
    prisma.user.findUnique({ 
        where: { username } 
    }),

  updateUser: (username, data) => 
    prisma.user.update({ 
        where: { username }, 
        data 
    }),
};