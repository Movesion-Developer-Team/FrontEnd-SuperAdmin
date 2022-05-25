

export interface GetAllDiscountsForPlayerResponseDto{

message: string

statusCode	: number

discounts: DiscountBodyDto[]	}



export interface DiscountBodyDto{
id	:number
name:	string

linkTermsAndConditions:	string

unityOfMeasurement:	string

discountValue:	Number

initialPrice:	number
finalPrice:	number

discountTypeId:	number

playerId:	number
}
