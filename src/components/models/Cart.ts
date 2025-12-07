import { IProduct } from '../../types/index.ts';
import { IEvents } from '../base/Events.ts';

export class Cart {
    private items: IProduct[];
    private events: IEvents

    constructor(events: IEvents) {
        this.items = [];
        this.events = events;
    }

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items.push(item);
        this.events.emit('cart:changed');
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
            this.events.emit('cart:changed');
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
