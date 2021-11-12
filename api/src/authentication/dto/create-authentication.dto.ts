import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthenticationDto {
    @IsNotEmpty()
    @IsString()
    public grantCode: string;
}
