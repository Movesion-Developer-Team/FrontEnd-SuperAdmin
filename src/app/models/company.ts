export interface CompanyDto {
    id:any;
 name:string ;
 address:string;
 numberOfEmployees:number;
//   unit: CompanyDto[]
//  id!:number
     
}

export interface GenericResponseDto <T>{
    unit:T;
    message: string;

}