import { IsNotEmpty, IsString } from "class-validator";

export class CreateYtAuthDto {
    @IsNotEmpty()
    @IsString()
    public grantCode: string;
}
