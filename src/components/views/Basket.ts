import { Component } from '../base/Component';
import { IBasket } from '../../types';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export class Basket extends Component<IBasket> {
    private listElement: HTMLElement;
    private priceElement: HTMLElement;
    private basketButton: HTMLButtonElement;
    private events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.events = events;

        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket:place');
        });
    }

    set list(list: HTMLElement[]) {
        if (list.length === 0) {
            this.listElement.innerHTML = '<div>Корзина пуста</div>';
        } else {
            this.listElement.replaceChildren(...list);
        }
    }

    set price(price: number | null) {
        this.priceElement.textContent = `${price} синапсов`;
    }

    set valid(isValid: boolean) {
        this.basketButton.disabled = !isValid;
    }
}