import { Injectable } from '@nestjs/common';

/*note to myself : the frontend will handle the login and signup thanks to the supabase api,
so no need to redefine the functions in the authService
*/

@Injectable()
export class AuthService {
  /*
    constructor(
    @InjectRepository(appuser)
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  

   async GetUser(email: string, password: string): Promise<appuser | null> {
    const user = await this.usersService.findByEmail( email );
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async signUp(createUserDto: CreateUserDto){
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if(existingUser){
        throw new Error('User already exists');
    }
    return this.usersService.create(createUserDto);
  }

  async login(user: appuser) {
    const payload = { username: user.username, sub: user.userid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
    */
}
