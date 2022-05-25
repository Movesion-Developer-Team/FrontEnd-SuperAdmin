export interface GetAllUsersBodyDto{
message: string;
statusCode: number;
users:UserDto[];

}

export interface UserDto{

    id:string;
    userName:string;
}