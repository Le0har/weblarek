import { IBuyer, TPayment } from '../../types/index.ts';
import { IEvents } from '../base/Events.ts';

export class Buyer {
    private payment: TPayment;
    private email: string;
    private phone: string;
    private address: string;
    private events: IEvents

    constructor(events: IEvents) {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.events = events;
    }

    setPayment(payment: TPayment): void {
        this.payment = payment;
        this.events.emit('buyer:changed');
    }

    setEmail(email: string): void {
        this.email = email;
        this.events.emit('buyer:changed');
    }

    setPhone(phone: string): void {
        this.phone = phone;
        this.events.emit('buyer:changed');
    }

    setAddress(address: string): void {
        this.address = address;
        this.events.emit('buyer:changed');
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        };
    }

    clear(): void {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    validate(): { payment?: string; email?: string; phone?: string; address?: string } {
        const errors: { payment?: string; email?: string; phone?: string; address?: string } = {}
        if (!this.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this.email) {
            errors.email = 'Укажите email';
        }
        if (!this.phone) {
            errors.phone = 'Укажите телефон';
        }
        if (!this.address) {
            errors.address = 'Укажите адрес доставки';
        }
        return errors;
    }
}
