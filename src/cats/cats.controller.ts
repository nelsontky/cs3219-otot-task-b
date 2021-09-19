import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { Cat } from "./interfaces/cat.interface";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
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
    this.catsService.update(id, updateCatDto);
  }
}
