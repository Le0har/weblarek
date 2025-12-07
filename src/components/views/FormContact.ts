import { Form } from './Form';
import { IFormContact } from '../../types';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export class FormContact extends Form<IFormContact> {
    private emailInputElement: HTMLInputElement;
    private phoneInputElement: HTMLInputElement;
    private events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.emailInputElement = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneInputElement = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
        this.events = events;

        this.submitButton.addEventListener('click', () => {
            this.events.emit('contact:submit');
        });

        this.emailInputElement.addEventListener('input', () => {
            this.events.emit('contact:email', { email: this.emailInputElement.value });
        });

        this.phoneInputElement.addEventListener('input', () => {
            this.events.emit('contact:phone', { phone: this.phoneInputElement.value });
        });
    }

    set email(email: string) {
        this.emailInputElement.value = email;
    }

    set phone(phone: string) {
        this.phoneInputElement.value = phone;
    }
}