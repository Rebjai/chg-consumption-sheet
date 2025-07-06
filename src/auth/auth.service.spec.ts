import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { StaffService } from 'src/staff/staff.service';
import { UsersService } from 'src/users/users.service';
import BcryptHashService from './bcrypt-hash.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
// Nest can't resolve dependencies of the AuthService (?, UsersService, BcryptHashService, ConfigService, JwtService). Please make sure that the argument StaffService at index [0] is available in the RootTestModule context.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
            provide: StaffService,
            useValue: {}
        },
        {
            provide: UsersService,
            useValue: {}
        },
        {
            provide: BcryptHashService,
            useValue: {
                hash: jest.fn().mockImplementation((x: string) => x),
                compare: jest.fn().mockImplementation((x: string, y: string) => x === y),
            }
        },
        {
            provide: ConfigService,
            useValue: {
                get: jest.fn().mockImplementation((key: string) => {
                    if (key === 'JWT_SECRET') return 'secret';
                    return null;
                }),
            }
        },
        {
            provide: JwtService,
            useValue: {
                sign: jest.fn().mockImplementation((payload) => `token-${payload.email}`),
            }
        }
    ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
