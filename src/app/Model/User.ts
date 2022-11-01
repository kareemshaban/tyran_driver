import { Order } from './Order';
import { Address } from './Address';
import { CartItem } from './CartItem';
export class User {
    public constructor(public id: number , public name: string , public phone: string , public email: string , public password: string ,
        public address: Address[] , public cart: CartItem[] , public default_address: number , public orders: Order[] , 
        public type: number){

    }
}
