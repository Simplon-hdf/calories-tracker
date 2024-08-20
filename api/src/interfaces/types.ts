
// Interface to type the request body
export interface SignupRequestBody {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

// // Extend the Request interface to add userId
// declare module 'express-serve-static-core' {
//     export interface Request {
//         userId?: number;
//     }
// }
