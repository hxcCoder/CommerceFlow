import { ProductType } from './ProductType';
import { ProductAvailability } from './ProductAvailability';

export class Product {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    readonly type: ProductType;
    readonly availability: ProductAvailability;

constructor(params: {
    id: string;
    name: string;
    price: number;
    type: ProductType;
    availability: ProductAvailability;
}) {
    this.id = params.id;
    this.name = params.name;
    this.price = params.price;
    this.type = params.type;
    this.availability = params.availability;
}

isAvailable(): boolean {
    return this.availability === ProductAvailability.Available;
}
}
