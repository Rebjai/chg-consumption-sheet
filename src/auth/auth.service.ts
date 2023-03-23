import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthDto } from './dtos/auth.dto';
import { JwtPayload } from './types/jwt-payload.type';
import { Tokens } from './types/tokens.type';
import { User } from './../users/entities/user.entity';
import { ForbiddenException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import ChgHashService from './Interfaces/chg-hash-service.Interface';
import { JwtService } from '@nestjs/jwt';
import BcryptHashService from './bcrypt-hash.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    @Inject(
      BcryptHashService) private hashService: ChgHashService,
    private configService: ConfigService,
    private jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    const isPasswordCorrect = await this.hashService.compare(pass, user.password)

    if (isPasswordCorrect) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateJwt(authDto: AuthDto) {
    const user = await this.validateUser(authDto.email, authDto.password)
    const tokens = await this.getTokens(user)
    const rt = await this.hashService.hash(tokens.refresh_token)
    this.usersService.updateRtHash(user.id, rt)
    return tokens
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }

  async register(registerDto: CreateUserDto): Promise<Tokens> {
    const newUser = { ...registerDto }
    newUser.password = await this.hashService.hash(registerDto.password)
    const matching = await this.hashService.compare(registerDto.password_confirmation, newUser.password)
    newUser.password_confirmation = matching ? newUser.password : registerDto.password_confirmation
    if (registerDto.password !== registerDto.password_confirmation)
      throw new UnprocessableEntityException({
        errors: {
          password_confirmation: 'Passwords don\'t match'
        }
      });
    const user: User = await this.usersService.create(newUser)
    const tokens = this.validateJwt({ email: user.email, password: registerDto.password })
    return tokens
  }
  async getTokens(user: User): Promise<Tokens> {

    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user: User = await this.usersService.findOne(userId);
    if (!user || !user.rt) throw new ForbiddenException('Access Denied');

    const rtMatches = await this.hashService.compare(rt, user.rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user);
    await this.usersService.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
  // async updateRtHash(userId: number, rt: string): Promise<void> {
  //   const hash = await this.hashService.hash(rt);
  //   await this.usersService.updateRtHash(userId,hash);
  // }
}