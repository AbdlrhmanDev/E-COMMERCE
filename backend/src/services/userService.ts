import { UserModel } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Interface for user registration parameters
interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Registers a new user in the system   
export const registerUser = async (params: RegisterParams) => {
    try {
        const {firstName, lastName, email, password} = params;
        
        // Check if user already exists
        const findUser = await UserModel.findOne({email});
        if(findUser){
            return {data: "User already exists" , statusCode: 400};
        }

        // Hash password for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create and save new user
        const newUser = new UserModel({firstName, lastName, email, password: hashedPassword});
        await newUser.save();
        return {data: generateToken({firstName, lastName, email}) , statusCode: 200};
    } catch (error) {
        console.error('Error in registerUser:', error);
        return {data: "An error occurred during registration", statusCode: 500};
    }
}

// Interface for user login parameters
interface LoginParams {
    email: string;
    password: string;
}

// Authenticates a user's login attempt 
export const loginUser = async (params: LoginParams) => {   
    try {
        const {email, password} = params;
        
        // Find user by email
        const findUser = await UserModel.findOne({email});
        if(!findUser){
            return {data: "Incorrect email or password" , statusCode: 400};
        }

        // Verify password using bcrypt
        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if(passwordMatch){
            return {data: generateToken({ email, firstName: findUser.firstName, lastName: findUser.lastName}), statusCode: 200};
        }
        return {data: "Incorrect email or password" , statusCode: 400};
    } catch (error) {
        console.error('Error in loginUser:', error);
        return {data: "An error occurred during login", statusCode: 500};
    }
}
const generateToken = (user: any) => {
    const token = jwt.sign(user , process.env.JWT_SECRET || "" ,{expiresIn : '1h'} );
    return token;
}
