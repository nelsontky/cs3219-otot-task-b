import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { Cat } from "./interfaces/cat.interface";

@Injectable()
export class CatsService {
  private readonly cats: { [id: string]: Cat } = {
    0: { name: "Garfield", id: "0", age: 2 },
  };

  create(createCatDto: CreateCatDto) {
    const id = "" + Object.keys(this.cats).length;
    this.cats[id] = { id, ...createCatDto };
  }

  update(id: string, updateCatDto: UpdateCatDto) {
    const cat = this.cats[id];

    if (!cat) {
      throw new HttpException("Cat not found", HttpStatus.NOT_FOUND);
    }

    this.cats[id] = { id, ...cat, ...updateCatDto };
  }

  findAll(): Cat[] {
    return Object.values(this.cats);
  }

  findOne(id: string): Cat {
    const cat = this.cats[id];

    if (!cat) {
      throw new HttpException("Cat not found", HttpStatus.NOT_FOUND);
    }

    return cat;
  }

  remove(id: string) {
    const cat = this.cats[id];

    if (!cat) {
      throw new HttpException("Cat not found", HttpStatus.NOT_FOUND);
    }

    delete this.cats[id];
  }
}
