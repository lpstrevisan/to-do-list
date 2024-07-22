import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>
  ) {}
  
  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.membersRepository.create({
      ...createMemberDto,
    });
    return this.membersRepository.save(member);
  }

  async findAll(): Promise<Member[]> {
    return this.membersRepository.find();
  }

  async findOne(id: number): Promise<Member> {
    return this.membersRepository.findOne({ where: { id }});
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.findOne(id);

    Object.assign(member, updateMemberDto);
    return this.membersRepository.save(member);
  }

  async remove(id: number): Promise<void> {
    const member = await this.findOne(id);
    await this.membersRepository.remove(member);
  }
}
