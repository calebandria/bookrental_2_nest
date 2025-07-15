import { Get, Req, Res, UseGuards } from "@nestjs/common";
import { OauthService } from "./oauth.service";

import { GoogleOAuthGuard } from "./guards/GoogleOAuthGuard";
import { Public } from "src/common/decorators/public.decorator";
import { Request, Response } from "express";

export class OauthController {
    constructor(private oauthService: OauthService){}

    @Public()
    @Get()
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(){

    }

    @Public()
    @Get('redirect')
    @UseGuards(GoogleOAuthGuard)
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        const user = req.user as any;

        //const { access_token } = await this.oauthService.generateJwtForoauthUser(user);

        return {
            message: 'Google login successful',
            user: {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname
            }
        }
    }


}