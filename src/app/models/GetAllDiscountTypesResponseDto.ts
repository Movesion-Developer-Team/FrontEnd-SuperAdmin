export interface GetAllDiscountTypesResponseDto {
    message:string;
    statusCode:number;
    discountTypes:DiscountTypeBodyDto[];


}


export interface DiscountTypeBodyDto{

    id:number;
    name:string;
    description:string;
}