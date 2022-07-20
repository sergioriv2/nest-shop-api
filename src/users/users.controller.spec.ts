import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    findAll: jest.fn((offset, limit) => {
      return {
        count: 0,
        offset,
        limit,
        results: [
          {
            id: 'abc123',
            email: 'test',
            username: 'test',
            createdAt: new Date(),
          },
        ],
      };
    }),
    findOne: jest.fn((id) => {
      return {
        id,
        email: 'test',
        username: 'test',
        createdAt: new Date(),
      };
    }),
    create: jest.fn((dto, role) => {
      return {
        ...dto,
        roleId: role.id,
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
    remove: jest.fn((id) => {
      return {
        ok: true,
        msg: 'User deleted successfully',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      await expect(controller.findAll(0, 10)).resolves.toEqual({
        count: expect.any(Number),
        offset: expect.any(Number),
        limit: expect.any(Number),
        results: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            username: expect.any(String),
            createdAt: expect.any(Date),
          }),
        ]),
      });

      expect(mockUserService.findAll).toHaveBeenCalledWith(0, 10);
      expect(mockUserService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findLocalUser', () => {
    it('should return the user requesting the endpoint', async () => {
      await expect(
        controller.findLocalUser({
          user: {
            id: 'abc123',
          },
        }),
      ).resolves.toEqual({
        results: expect.objectContaining({
          id: expect.any(String),
          email: expect.any(String),
          username: expect.any(String),
          createdAt: expect.any(Date),
        }),
      });

      expect(mockUserService.findOne).toHaveBeenCalledWith('abc123');
      expect(mockUserService.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the specified user in the params', async () => {
      const id = 'abc123';

      await expect(controller.findOne(id)).resolves.toEqual({
        results: expect.objectContaining({
          id: expect.any(String),
          email: expect.any(String),
          username: expect.any(String),
          createdAt: expect.any(Date),
        }),
      });

      expect(mockUserService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update the specified user in the params', async () => {
      const dto = { username: 'jest user' };
      const id = 'abc123';

      await expect(controller.update(id, dto)).resolves.toEqual({
        results: expect.objectContaining({
          id: expect.any(String),
          username: expect.any(String),
        }),
      });

      expect(mockUserService.update).toHaveBeenCalledWith(id, dto);
      expect(mockUserService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateLocalUser', () => {
    it('should update the user requesting the endpoint', async () => {
      const dto = { username: 'jest user' };
      const requestUser = 'abc123';

      await expect(controller.update(requestUser, dto)).resolves.toEqual({
        results: expect.objectContaining({
          id: expect.any(String),
          username: expect.any(String),
        }),
      });

      expect(mockUserService.update).toHaveBeenCalledWith(requestUser, dto);
    });
  });

  describe('remove', () => {
    it('should soft delete the specified user in the params', async () => {
      const id = 'abc123';

      await expect(controller.remove(id)).resolves.toEqual({
        results: expect.objectContaining({
          ok: expect.any(Boolean),
          msg: expect.any(String),
        }),
      });

      expect(mockUserService.remove).toHaveBeenCalledWith(id);
    });
  });
});
