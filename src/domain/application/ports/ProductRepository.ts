import { Product } from '../../entities/product/product';

export interface ProductRepository {
    findByIds(ids: string[]): Promise<Product[]>;
}   
