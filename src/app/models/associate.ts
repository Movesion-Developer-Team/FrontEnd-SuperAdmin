export interface associate {
    companyId:number
    playerId:number

}

export interface GenericResponseDto <T>{
    unit:T;
    message: string;

}