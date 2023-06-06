import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 请求被拒默认返回401未经授权的错误码
      secretOrKey: jwtConstants.secret, //jwt密钥
    });
  }
  //数据库中查找 id为sub的用户
  async validate({ sub }) {
    return await this.prisma.user.findUnique({ where: { id: sub } });
  }
}
