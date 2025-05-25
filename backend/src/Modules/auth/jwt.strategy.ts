import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
      algorithms: ['HS256'], 
      /*
      note to myself : apparently it is a good practice to add it so it ensure that the algorithm that supabase
      use is chosen, even though it is this one by default (HS256)
      */
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
