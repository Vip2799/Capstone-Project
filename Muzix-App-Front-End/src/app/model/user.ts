import { address } from "./address";

export interface user{
    email:string | undefined | null,
    userName:string | undefined | null,
    password:string | undefined | null,
    profilePic:string | undefined | null,
    age:number | undefined | null ,
    mobileNo:number | undefined | null,
    address:address
}