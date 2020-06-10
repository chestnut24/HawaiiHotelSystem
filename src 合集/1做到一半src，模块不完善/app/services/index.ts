
import { UserService } from './user.service';
import { RoomService } from './room.service';
import { AuthService } from './auth.service';
import { CatelogService } from './catelog.service';
import { MySubscribeService } from './my-subscrible.service';
import { AuthGuardGuard} from './auth-guard.guard';
export const SERVICES = [
  UserService,
  RoomService,
  AuthService,
  CatelogService,
  MySubscribeService,
  AuthGuardGuard
];
