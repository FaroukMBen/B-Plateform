import { Controller } from '@nestjs/common';

/**
 * The authentification provided by the supabase api is used to handle the login and signup
 * so no need to redefine the functions in the authController wich means that all the auth module is handled.
 */

@Controller('profile')
export class ProfileController {
  /*
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProfile(@Request() req) {
    return req.user;
  }
  */
}
