export interface GetDiscountLimitResponseDto{

    message: string;
    statusCode: number;
    limit: LimitBodyDto;


}


export interface LimitBodyDto {

    limitValue: number;
}
