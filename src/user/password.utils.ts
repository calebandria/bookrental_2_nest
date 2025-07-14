import * as bcrypt from 'bcryptjs';

export const hashPassowrd = async(password: string): Promise<string> => {
    const saltRounds = await bcrypt.genSalt(10);
    return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async(password: string, hash: string): Promise<boolean> =>{
    return bcrypt.compare(password, hash);
}