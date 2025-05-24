import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { appuser } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(appuser)
    private userRepository: Repository<appuser>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<appuser> {
    try {
      const existing = await this.findByEmail(createUserDto.email);
      if (existing) {
        throw new BadRequestException('Email already in use');
      }

      const user = this.userRepository.create(createUserDto);
      user.password = await bcrypt.hash(createUserDto.password, 10);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Failed to create user: ' + error.message);
    }
  }

  async findAll(): Promise<appuser[]> {
    return this.userRepository.find();
  }

  async update(userid: number, updateUserDto: UpdateUserDto): Promise<appuser> {
    const user = await this.findById(userid);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userRepository.update(userid, updateUserDto);

    const updatedUser = await this.findById(userid);
    if (!updatedUser) {
      throw new NotFoundException('Updated user not found');
    }

    return updatedUser;
  }


  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<appuser | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<appuser | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(userid: number): Promise<appuser | null> {
    return this.userRepository.findOne({ where: { userid } });
  }

  async verifyUser(userid: number): Promise<appuser | null> {
    const user = await this.findById(userid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isVerified = true;
    return this.userRepository.save(user);
  }
}
