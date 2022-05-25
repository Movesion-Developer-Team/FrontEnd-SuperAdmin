

export interface GetAllPlayerResponseDto{
    message: string,
    statusCode: number
    players: PlayerBodyDto[]
}


export interface PlayerBodyDto {
    id: number;
    shortName: string
    fullName: string
    playStoreLink: string
    appStoreLink: string
    linkDescription: string
    color: string
    discountTypes:DiscountTypeBodyDto[];
    categories:CategoryBodyDto[];
}


export interface DiscountTypeBodyDto{
    id:number;
    name:string;
    description:string;
}

export interface CategoryBodyDto{
    id: number;
    name: string;
   Description: string;
  
}

