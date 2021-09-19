import { IsInt, IsString, Min, MinLength } from "class-validator";

export class CreateCatDto {
  @IsString()
  @MinLength(1)
  readonly name: string;

  @IsInt()
  @Min(0)
  readonly age: number;
}
