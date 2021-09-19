import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll() {
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(
    @Param("id")
    id: string
  ) {
    return this.catsService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id")
    id: string,
    @Body() updateCatDto: UpdateCatDto
  ) {
    await this.catsService.update(id, updateCatDto);
  }

  @Delete(":id")
  async remove(
    @Param("id")
    id: string
  ) {
    await this.catsService.remove(id);
  }
}
