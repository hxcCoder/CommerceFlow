import { ProductType } from './ProductType';//importo el tipo
import { ProductAvailability } from './ProductAvailability';// importo la disponibilidad

export class Product {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly price: number,
        public readonly type: ProductType,
        public readonly availability: ProductAvailability
)// hago el constructor con los atributos del producto, y sus diferentes estados
{
    if (price < 0) {
        throw new Error('Product price cannot be negative');
    }
}

isAvailable(): boolean {
        return this.availability === ProductAvailability.AVAILABLE;
    }
}
