import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IDENTITY_STRATEGY_LOCAL } from '../strategy/local.strategy';

@Injectable()
/* eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided */
export class LocalAuthGuard extends AuthGuard(IDENTITY_STRATEGY_LOCAL) {}
