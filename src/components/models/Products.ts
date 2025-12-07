import { IProduct } from '../../types/index.ts';
import { IEvents } from '../base/Events.ts';

export class Products {
    private items: IProduct[];
    private selectedItem: IProduct | null;
    private events: IEvents;

    constructor(events: IEvents) {
        this.items = [];
        this.selectedItem = null;
        this.events = events;
    }

    setItems(items: IProduct[]): void {
        this.items = items;
        this.events.emit('products:changed');
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getItemById(id: string): IProduct | null {
        let itemById = null;
        for (const item of this.items) {
            if (item.id == id) {
                itemById = item;
                break;
            }
        }
        return itemById;
    }

    setSelectedItem(item: IProduct): void {
        this.selectedItem = item;
        this.events.emit('product:selected');
    }

    getSelectedItem(): IProduct | null {
        return this.selectedItem;
    }
}
