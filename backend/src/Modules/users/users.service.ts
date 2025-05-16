import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { appuser } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(appuser)
    private userRepository: Repository<appuser>,
  ) {}

  async create(createUserDto: any): Promise<appuser> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<appuser[]> {
    return this.userRepository.find();
  }

  async update(userid: number, updateUserDto: any): Promise<appuser> {
    await this.userRepository.update(userid, updateUserDto);
    return this.findById(userid);
  }

  async remove(id: number): Promise<void> {
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
    if (user) {
      user.isVerified = true;
      return this.userRepository.save(user);
    }
    return null;
  }
}
