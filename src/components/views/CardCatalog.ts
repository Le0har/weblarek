import { Card } from './Card';
import { ICardActions, ICardCatalog } from '../../types';
import { ensureElement } from '../../utils/utils';
import { categoryMap } from '../../utils/constants';
import { CategoryKey } from '../../types';

export class CardCatalog extends Card<ICardCatalog> {
    private categoryElement: HTMLElement;
    private imageElement: HTMLImageElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick);
        }
    }

    set category(category: string) {
        this.categoryElement.textContent = category;
        for(const key in categoryMap) {
            this.categoryElement.classList.toggle(
                categoryMap[key as CategoryKey],
                key == category
            );
        }
    }

    set image(src: string) {
        this.setImage(this.imageElement, src);
    }
}