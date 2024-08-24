
// Interface to type the request body
export interface SignupRequestBody {
    pseudo: string;
    email: string;
    password: string;
};

// // Extend the Request interface to add userId
// declare module 'express-serve-static-core' {
//     export interface Request {
//         userId?: number;
//     }
// }
