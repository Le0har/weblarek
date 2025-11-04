import { IProduct } from '../../types/index.ts';

export class Cart {
    private items: IProduct[];

    constructor() {
        this.items = [];
    }

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items.push(item);
    }

    removeItem(item: IProduct): void {
        let hasElementToRemove = false;
        let indexElementToRemove = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] == item) {
                hasElementToRemove = true;
                indexElementToRemove = i;
                break;
            }
        }
        if (hasElementToRemove) {
            this.items.splice(indexElementToRemove, 1);
        }
    }

    clear(): void {
        this.items = [];
    }

    getTotalPrice(): number {
        let totalPrice = 0
        for (const item of this.items) {
            if (item.price) {
                totalPrice += item.price;
            }
        }
        return totalPrice;
    }

    getItemsCount(): number {
        return this.items.length;
    }

    hasItem(id: string): boolean {
        let hasElementById = false;
        for (const item of this.items) {
            if (item.id == id) {
                hasElementById = true;
                break;
            }
        }
        return hasElementById;
    }
}
