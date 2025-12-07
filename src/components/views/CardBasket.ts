import { Card } from './Card';
import { ICardActions, ICardBasket } from '../../types';
import { ensureElement } from '../../utils/utils';

export class CardBasket extends Card<ICardBasket> {
    private indexElement: HTMLElement;
    private cardBasketButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.cardBasketButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        if (actions?.onClick) {
            this.cardBasketButton.addEventListener('click', actions.onClick);
        }
    }

    set index(index: number) {
        this.indexElement.textContent = String(index);
    }
}