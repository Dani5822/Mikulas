import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class KidService {
  constructor(private db:PrismaService=db) {}

  create(createKidDto: CreateKidDto) {
    return this.db.kid.create({data:createKidDto});
  }

  findAll() {
    return this.db.kid.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.db.kid.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Kid not found');
    }
  }

  async update(id: number, UpdateKidDto: UpdateKidDto) {
    try {
      return await this.db.kid.update({ where: { id }, data: UpdateKidDto });
    } catch (error) {
      throw new NotFoundException('Kid not found');
    }
  }

  async remove(id: number) {
    try {
      return await this.db.kid.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Kid not found');
    }
  }

  addKidtoToy(kidid: number, toyid: number) {
    return this.db.kid.update({
      where: { id: kidid },
      data: { Toys: { connect: { id: toyid } } },
    });
  }
  removeKidtoToy(kidid: number, toyid: number) {
    return this.db.kid.update({
      where: { id: kidid },
      data: { Toys: { disconnect: { id: toyid } } },
    });
  }
}
