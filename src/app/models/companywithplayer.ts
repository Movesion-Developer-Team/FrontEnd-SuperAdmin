

export interface GetAllCompaniesWithPlayersResponseDto{
    message: string;
    companies:CompanyWithPlayersBodyDto[];
}

export interface CompanyWithPlayersBodyDto{
    companyName: string;
    playerName: string;

}