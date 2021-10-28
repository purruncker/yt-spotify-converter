import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: []
})
export class AuthenticationModule {}
