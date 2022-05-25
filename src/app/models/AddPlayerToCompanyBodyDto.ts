
import { companyBodyDto } from "./companyBodyDto";
import { PlayerBodyDto } from "./PlayerBodyDto";



export interface AddPlayerToCompanyBodyDto{
 message: string;
 companies: CompanyWithPlayersBodyDto[]
}



export interface CompanyWithPlayersBodyDto{
company: companyBodyDto[];
Players:PlayerWithCategoriesBodyDto[];
}

export interface PlayerWithCategoriesBodyDto{

    player:PlayerBodyDto[];
    categories: CategoryBodyDto[];

}

export interface CategoryBodyDto{
    id: number;
    name:string;
    description:string;
}