import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { OauthService } from "./oauth.service";

import { GoogleOAuthGuard } from "./guards/GoogleOAuthGuard";
import { Public } from "src/common/decorators/public.decorator";
import { Request, Response } from "express";
import { User } from "@prisma/client";

@Controller('oauth/google')
export class OauthController {
    constructor(private oauthService: OauthService) { }

    @Public()
    @Get()
    @UseGuards(GoogleOAuthGuard)
    async googleAuth() {

    }

    @Public()
    @Get('redirect')
    @UseGuards(GoogleOAuthGuard)
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        const user = req.user as User;

        //const { access_token } = await this.oauthService.generateJwtForoauthUser(user);
        if (!user) {
            return res.redirect('https://google.com')
        }
        console.log('OAuth User registered/found in DB:', user);
        res.status(200).send(`OAuth registration successful for ${user.email}. You can now add JWT!`);
    }


}