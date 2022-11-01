import { Category } from './Category';
import { Extra } from './Extra';
export class Product {
    public constructor(public id: number , public img: string , public img2: string , public img3: string , public name: string , 
    public name_en: string , public catId: number , public qnt: number , public market_id: number , public category: Category , 
    public extras: Extra[] , public size: string , public cart_id: number , public extra: string , public price: number , 
    public catName: string , public add: string , public details: string , public available: number) {

    }
}