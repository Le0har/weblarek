import { IProduct } from '../../types/index.ts';

export class Products {
    private items: IProduct[];
    private selectedItem: IProduct | null;

    constructor() {
        this.items = [];
        this.selectedItem = null;
    }

    setItems(items: IProduct[]): void {
        this.items = items;
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
    }

    getSelectedItem(): IProduct | null {
        return this.selectedItem;
    }
}
