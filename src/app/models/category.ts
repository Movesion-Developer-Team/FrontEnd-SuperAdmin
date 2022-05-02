export interface Category {
    Name:string
    Description:string
   }

   
   export interface GenericResponseDto <T>{
    unit:T;
    message: string;

}