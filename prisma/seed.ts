import { PrismaClient, RoleName } from "@prisma/client";

const prisma = new PrismaClient()

async function main(){
    console.log(`Start seeding ...`)

    console.log(`Seeding roles...`);
    const userRole = await prisma.role.upsert({
        where: {name: RoleName.ROLE_USER},
        update: {},
        create: {
            name: RoleName.ROLE_USER,
        },
    });

    const adminRole = await prisma.role.upsert({
        where: {name : RoleName.ROLE_ADMIN },
        update:{},
        create:{
            name: RoleName.ROLE_ADMIN
        }
    });

    console.log(`Seeded roles: ${userRole.name}, ${adminRole.name}`)
}

main()
    .catch((e) =>{
        console.error(e);
        process.exit(1);
    })
    .finally(async() =>{
        await prisma.$disconnect();
    });