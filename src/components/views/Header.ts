import { Component } from '../base/Component';
import { IHeader } from '../../types';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export class Header extends Component<IHeader> {
    private counterElement: HTMLElement;
    private headerBasketButton: HTMLButtonElement;
    private events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
        this.headerBasketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this.events = events;

        this.headerBasketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set counter(counter: number) {
        this.counterElement.textContent = String(counter);
    }
}
