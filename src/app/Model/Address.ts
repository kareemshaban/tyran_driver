import { Region } from './Region';
export class Address {
    public constructor(public id: number , public name: string , public details: string , public user_id: number , 
        public location_late: number , public location_long: number , public city: Region){

    }
}