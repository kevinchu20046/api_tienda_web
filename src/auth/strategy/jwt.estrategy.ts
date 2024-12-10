import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import ConfigEnv from '../../../config'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ConfigEnv.get_jwt_secret(),
    });
  }

  async validate(payload:{sub:string,role:string}) {
    return { sub: payload.sub , role: payload.role };
  }
}