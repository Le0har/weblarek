import { Card } from './Card';
import { ICardPreview } from '../../types';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export class CardPreview extends Card<ICardPreview> {
    private categoryElement: HTMLElement;
    private textElement: HTMLElement;
    private imageElement: HTMLImageElement;
    private cardPreviewButton: HTMLButtonElement;
    private events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.textElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.cardPreviewButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this.events = events;
    }

    set category(category: string) {
        this.categoryElement.textContent = category;
    }

    set text(text: string) {
        this.textElement.textContent = text;
    }

    set image(src: string) {
        this.setImage(this.imageElement, src);
    }

    set inCart(isInCart: boolean) {
        this.cardPreviewButton.textContent = isInCart ? 'Удалить из корзины' : 'В корзину';

        this.cardPreviewButton.onclick = () => {
            if (isInCart) {
                this.events.emit('card:remove');
            } else {
                this.events.emit('card:add');
            }
        };
    }
}