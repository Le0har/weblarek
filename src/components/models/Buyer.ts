import { IBuyer, TPayment } from '../../types/index.ts';

export class Buyer {
    private payment: TPayment;
    private email: string;
    private phone: string;
    private address: string;

    constructor() {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    setPayment(payment: TPayment): void {
        this.payment = payment;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

    setAddress(address: string): void {
        this.address = address;
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
        let errors: { payment?: string; email?: string; phone?: string; address?: string } = {}
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
