import { Component } from '../base/Component';
import { IModal } from '../../types';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export class Modal extends Component<IModal> {
    private contentElement: HTMLElement;
    private modalButton: HTMLButtonElement;
    private events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
        this.modalButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.events = events;

        this.modalButton.addEventListener('click', () => {
            this.events.emit('modal:close');
        });

        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.close();
            }
        });
    }

    set content(content: HTMLElement) {
        this.contentElement.replaceChildren(content);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
    }

    isOpen(): boolean {
        return this.container.classList.contains('modal_active');
    }
}