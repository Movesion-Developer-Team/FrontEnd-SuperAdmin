
import { CategoryBodyDto } from "./CategoryBodyDto";

export interface PlayerBodyDto {
    id:number;
    shortName: string;
    fullName: string;
    categoryId :number; 
    playStoreLink: string;
    appStoreLink: string;
    linkDescription: string;
    color: string;
    

  
   
}

export interface PlayerMainResponseDto{
    message:string;
    player :PlayerBodyDto;
}