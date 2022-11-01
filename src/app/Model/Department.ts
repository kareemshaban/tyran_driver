import { Product } from 'src/app/Model/Product';
export class Department {
    public constructor(public id: number , public img: string , public name: string , public name_en: string , 
        public market_id: number , public products: Product[]){

    }
}