export interface GetAllCategoriesResponseDto{
    message: string,
    categories: CategoryBodyDto[]
}


export interface CategoryBodyDto {
    id: number;
    name: string;
   description: string;
  
}