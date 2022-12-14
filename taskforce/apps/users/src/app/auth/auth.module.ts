import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TaskUserModule } from '../task-user/task-user.module';
import { TaskUserService } from '../task-user/task-user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { getJwtOptions, JwtConfig } from '../../config/jwt.config';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig, RABBITMQ_SERVICE } from '../../config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TaskUserService, JwtAccessStrategy, JwtRefreshStrategy, JwtConfig],
  imports: [
    TaskUserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: getJwtOptions,
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ])
  ]
})
export class AuthModule {}
