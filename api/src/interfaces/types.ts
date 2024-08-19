
// Interface to type the request body
export interface SignupRequestBody {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};


declare module 'express-serve-static-core' {
    interface Request {
        userId?: number;
    }
}
