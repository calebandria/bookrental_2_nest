import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { OauthController } from "./oauth.controller";
import { OauthService } from "./oauth.service";
import { GoogleStrategy } from "./strategies/google.strategy";

@Module({
    imports: [
        PassportModule,
        ConfigModule,
    ], 
    controllers: [OauthController],
    providers: [OauthService, GoogleStrategy],
    exports: [OauthService]
})
export class OauthModule {}