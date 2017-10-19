export class CartProduct {
    public id: string;
    public name: string;
    public price: string;
    public count: number;

    constructor(id, name, price, count){
        this.id = id;
        this.name = name;
        this.price = price;
        this.count = count;
    }
}
