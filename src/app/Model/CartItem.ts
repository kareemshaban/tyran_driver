import { Extra } from './Extra';
import { Product } from 'src/app/Model/Product';
export class  CartItem {
    public constructor (public id: number , public user_id: number , public market_id: number , 
        public product_id: number , public size: number , public price: number , public total: number , 
        public details: string , public order_id: number , public qnt: number , 
        public item: Product , public extra: number , public addition: number , 
        public extras: Extra[]){

    }
}