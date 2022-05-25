export interface GetAllPlayersForCurrentCompanyResponseDto{
    message:string
    players: players[]
}
export interface players{


    id:number;
    shortName: string;
    fullName: string;
    categoryId :number; 
    playStoreLink: string;
    appStoreLink: string;
    linkDescription: string;
    color: string;
    



}