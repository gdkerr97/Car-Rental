export class CarDTO{

    id?: number;
    name?: string;
    brand?: string;
    type?: string;
    color?: string;
    year?: string;
    transmission?: string;
    price?: number;
    image?: File;
    returnedImage?: string;

    constructor(name: string, brand: string, type: string, color: string, year: string, transmission: string, price: number, image: File){

        this.name = name;
        this.brand = brand;
        this.type = type;
        this.color = color;
        this.year = year;
        this.transmission = transmission;
        this.price = price;
        this.image = image;
    }
}