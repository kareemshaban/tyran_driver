
import { Category } from "./Category";
import { Department } from "./Department";

export class Market {
    public constructor(public id: number , public name: string ,  public name_en: string , public location_lat: number , public location_long: number , 
        public delivery_value: number , public min_order_val: number , public rate_count: number , public total_rate: number , 
        public rate_vale:number , public address: string , public img: string , public logo: string ,
        public delivery_time: number , public state: number , public categories: Category[] , 
        public departments: Department[] , public userName: string , public password: string){

    }
}