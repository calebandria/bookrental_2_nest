import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RoleName, User } from "@prisma/client";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OauthService {
    constructor(
        private prisma: PrismaService,
        //private authService: AuthService
    ) { }

    async findOrCreateGoogleUser(profile: { email: string; firstName: string; lastName: string; id: string; accessToken: string }): Promise<User> {
        try {
            let user = await this.prisma.user.findUnique({
                where: { email: profile.email }
            });

            const defaultUserRole = await this.prisma.role.findUnique({
                where: { name: RoleName.ROLE_USER }
            })

            if (!defaultUserRole) {
                throw new InternalServerErrorException('Default user role (ROLE_USER) not found. Please seed the roles table.')
            }

            if (!user) {
                user = await this.prisma.user.create({
                    data: {
                        email: profile.email,
                        firstname: profile.firstName,
                        lastname: profile.lastName,
                        provider: 'GOOGLE',
                        providerId: profile.id,
                        status: 'INACTIVE',
                        userRoles: {
                            create: [
                                {
                                    role: {
                                        connect: { id: defaultUserRole.id }
                                    }
                                }
                            ]
                        }


                    }
                })
            }
            else {
                console.log("User already existing!")
            }

            return user;
        }
        catch (error) {
            console.error('Oauth login validation failed: ', error);
            throw error;
        }

        
    }
}