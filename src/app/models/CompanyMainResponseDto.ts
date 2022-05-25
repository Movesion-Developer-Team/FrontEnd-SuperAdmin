import {companyBodyDto} from '../models/companyBodyDto'


export interface CompanyMainResponseDto{
    message: string;
    company: companyBodyDto[]
}