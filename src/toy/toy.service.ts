import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';
import { r } from '@faker-js/faker/dist/airline-BnpeTvY9';

@Injectable()
export class ToyService {
  constructor(private db: PrismaService = db) {}
  create(createToyDto: CreateToyDto) {
    return this.db.toy.create({ data: createToyDto });
  }

  findAll() {
    return this.db.toy.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.db.toy.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Toy not found');
    }
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    try {
      return await this.db.toy.update({ where: { id }, data: updateToyDto });
    } catch (error) {
      throw new NotFoundException('Toy not found');
    }
  }

  async remove(id: number) {
    try {
      return await this.db.toy.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Toy not found');
    }
  }

  addToytoKid(kidid: number, toyid: number) {
    return this.db.toy.update({
      where: { id: toyid },
      data: { Kids: { connect: { id: kidid } } },
    });
  }
  removeToytoKid(kidid: number, toyid: number) {
    return this.db.toy.update({
      where: { id: toyid },
      data: { Kids: { disconnect: { id: kidid } } },
    });
  }
}
