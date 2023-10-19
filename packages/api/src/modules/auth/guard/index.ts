import { JwtAuthGuard } from './jwt.guard';
import { LocalAuthGuard } from './local.guard';

export default Object.freeze([JwtAuthGuard, LocalAuthGuard]);
