import {
  Controller,
  Get,
  Delete,
  Post,
  Body,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { appuser } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<appuser[]> {
    return this.usersService.findAll();
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<appuser> {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get('username/:username')
  async findByUsername(@Param('username') username: string): Promise<appuser> {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<appuser> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<appuser> {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  async remove(@Body('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post('update')
  async update(
    @Body('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<appuser> {
    return this.usersService.update(id, updateUserDto);
  }

  @Post('verify')
  async verify(@Body('id', ParseIntPipe) id: number): Promise<appuser> {
    const user = await this.usersService.verifyUser(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
