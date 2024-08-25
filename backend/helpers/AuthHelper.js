import bycrypt from 'bcrypt';

//hashpassword
export const hashPassword = async (password) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bycrypt.hash(password,saltRounds);
        return hashedPassword;        
    }catch(error){
        console.log(error);
    }
};

export const comparePassword = async (password,hashPassword) => {
    return bycrypt.compare(password,hashPassword);
}