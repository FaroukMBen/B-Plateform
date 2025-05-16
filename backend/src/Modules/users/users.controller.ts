import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a user with id: ${id}`;
  }

  @Get(':username')
  findByUsername(@Param('username') username: string): string {
    return `This action returns a user with username: ${username}`;
  }

  @Get(':email')
  findByEmail(@Param('email') email: string): string {
    return `This action returns a user with email: ${email}`;
  }

  @Post()
  create(@Body() createUserDto: any): string {
    return 'This action adds a new user';
  }

  @Post('remove')
  remove(@Body('id') id: string): string {
    return `This action removes a user with id: ${id}`;
  }

  @Post('update')
  update(@Body('id') id: string, @Body() updateUserDto: any): string {
    return `This action updates a user with id: ${id}`;
  }

  @Post('verify')
  verify(@Body('id') id: string): string {
    return `This action verifies a user with id: ${id}`;
  }
}
