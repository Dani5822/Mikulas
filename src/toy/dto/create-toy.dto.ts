import { IsIn, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
export class CreateToyDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsString()
    @IsNotEmpty()
    @IsIn(['plastic', 'wood', 'metal', 'other'])
    material:string;
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    weight: number;
}
