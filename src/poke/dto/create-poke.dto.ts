import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreatePokeDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    nro: number;

}
