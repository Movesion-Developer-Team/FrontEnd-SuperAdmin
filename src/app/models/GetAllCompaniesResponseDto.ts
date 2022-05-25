


export interface GetAllCompaniesResponseDto{
        message: string,
        companies: companyBodyDto[]
}


export interface companyBodyDto {
        id: number;
        name: string;
        address: string;
     
      
    }




   