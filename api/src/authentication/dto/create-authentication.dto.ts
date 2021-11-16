import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthenticationDto {
    @IsNotEmpty()
    @IsString()
    public grantCode: string;

    @IsString()
    public grantType: "authorization_code" | "refresh_token" = "authorization_code";
}

