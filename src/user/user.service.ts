import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { RoleName, User } from '@prisma/client';
import { hashPassowrd } from "./password.utils";
import { connect } from "http2";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){};

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.prisma.user.findUnique({
            where: {email: createUserDto.email},
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exists')
        }

        const hashedPassword = await hashPassowrd(createUserDto.password);

        const defaultUserRole = await this.prisma.role.findUnique({
            where: {name: RoleName.ROLE_USER}
        })

        if(!defaultUserRole){
            throw new InternalServerErrorException('Default user role (ROLE_USER) not found. Please seed the roles table.')
        }

        return this.prisma.user.create({
            data:{
                email: createUserDto.email,
                password: hashedPassword,
                firstname: createUserDto.firstname,
                lastname: createUserDto.lastname,
                provider:'TRADITIONAL',
                providerId: '',
                status:'INACTIVE',
                userRoles:{
                    create: [
                        {
                            role:{
                                connect:{id: defaultUserRole.id}
                            }
                        }
                    ]
                }
            },
          /*   include: {
                userRoles: {
                    include:{
                        role: true
                    }
                }
            } */
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({where:{email}})
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({where:{id}})
    }
}