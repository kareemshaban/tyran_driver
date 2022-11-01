import { CartItem } from 'src/app/Model/CartItem';
import { Product } from './Product';
export class Order {
    public constructor(public id: number , public user_id: number , public notes: string , 
        public delivery_date: string , public location_lat: number , public location_long: number , 
        public payment_img: string , public payment_type: string , public state: number , public address_id:number , 
        public total: number , public coupone_id:number , public discount: number , public delivery_value: number , 
        public Net: number , public delivey_type:number , public products: CartItem[] ){

    }
}