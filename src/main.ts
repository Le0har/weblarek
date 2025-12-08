import './scss/styles.scss';
import { Products } from './components/models/Products.ts';
import { Cart } from './components/models/Cart.ts';
import { Buyer } from './components/models/Buyer.ts';
import { Api } from './components/base/Api.ts';
import { WebLarekApi } from './components/api/WebLarekApi.ts';
import { API_URL, CDN_URL } from './utils/constants.ts';
import { cloneTemplate, ensureElement } from './utils/utils.ts';
import { FormContact } from './components/views/FormContact.ts';
import { FormOrder } from './components/views/FormOrder.ts';
import { Header } from './components/views/Header.ts';
import { Modal } from './components/views/Modal.ts';
import { Success } from './components/views/Success.ts';
import { Basket } from './components/views/Basket.ts';
import { Gallery } from './components/views/Gallery.ts';
import { CardCatalog } from './components/views/CardCatalog.ts';
import { CardPreview } from './components/views/CardPreview.ts';
import { CardBasket } from './components/views/CardBasket.ts';
import { EventEmitter } from './components/base/Events.ts';
import { IOrderRequest, IProduct } from './types/index.ts';

const events = new EventEmitter();

const productsModel = new Products(events);
const cartModel = new Cart(events);
const buyerModel = new Buyer(events);

const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);
const getRequest = webLarekApi.getProductList();

getRequest.then((data) => {
    console.log('[DEBUG] запрос к API');
    const fixedItems = data.items.map(product => ({
        ...product,
        image: `${CDN_URL}${product.image.replace('.svg', '.png')}`
    }));
    productsModel.setItems(fixedItems);
}).catch(error => {
    console.error('[DEBUG] Ошибка при загрузке товаров с сервера:', error);
});


// Тестирование заполнения каталога
events.on('products:changed', () => {
    const productList = productsModel.getItems();
    const cardElements: HTMLElement[] = [];

    productList.forEach(product => {
        const cardCatalogElement = cloneTemplate('#card-catalog');
        const cardCatalog = new CardCatalog(cardCatalogElement, {
            onClick: () => events.emit('card:selected', product)
        });
        const newCardElement = cardCatalog.render(product);
        cardElements.push(newCardElement);
    });

    const galleryElement = ensureElement('.gallery');
    const gallery = new Gallery(galleryElement);
    gallery.render({
        catalog: cardElements
    });
});


// Тестирование класса Modal
const modalElement = ensureElement('#modal-container');
const modal = new Modal(modalElement, events);
events.on('modal:close', () => {
    modal.close();
});


// Тестирование класса Header
const headerElement = ensureElement<HTMLElement>('.header');
const header = new Header(headerElement, events);


// Тестирование класса Basket
const basketElement = cloneTemplate('#basket');
const basket = new Basket(basketElement, events);

events.on('basket:open', () => {
    const basketContent = createBasketContent();
    modal.open();
    modal.content = basketContent;
});

events.on('card:selected', (data: IProduct) => {
    productsModel.setSelectedItem(data);
});

events.on('product:selected', () => {
    const cardPreviewElement = cloneTemplate('#card-preview');
    const cardPreview = new CardPreview(cardPreviewElement, events);
    const selectedProduct  = productsModel.getSelectedItem();

    if (selectedProduct ) {
        const isInCart = cartModel.hasItem(selectedProduct.id);
        const newcardPreview = cardPreview.render({
            ...selectedProduct,
            inCart: isInCart
        });
        modal.open();
        modal.content = newcardPreview
    }
});

events.on('card:add', () => {
    const checkedCardPreview = productsModel.getSelectedItem();
    if (checkedCardPreview) {
        cartModel.addItem(checkedCardPreview);
    }
    modal.close();
});

events.on('card:remove', () => {
    const checkedCardPreview = productsModel.getSelectedItem();
    if (checkedCardPreview) {
        cartModel.removeItem(checkedCardPreview);
    }
    modal.close();
});

events.on('cardBasket:delete', (data:IProduct) => {
    cartModel.removeItem(data);
});

events.on('cart:changed', () => {
    header.render({ counter: cartModel.getItemsCount() });
    if (modal.isOpen()) {
        const updatedBasketContent = createBasketContent();
        modal.content = updatedBasketContent;
    }
});


// Отображение формы заказа
const formOrderElement = cloneTemplate('#order');
const formOrder = new FormOrder(formOrderElement, events);

events.on('basket:place', () => {
    const buyerData = buyerModel.getData();
    const errors = buyerModel.validate();
    const hasErrors = errors.payment || errors.address;

    let errorText = '';
    if (errors.payment) errorText += errors.payment + '. ';
    if (errors.address) errorText += errors.address + '. ';

    modal.content = formOrder.render({
        ...buyerData,
        valid: !hasErrors,
        errors: errorText
    });

});

events.on('order:card', () => {
    buyerModel.setPayment('card');
});

events.on('order:cash', () => {
    buyerModel.setPayment('cash');
});

events.on('order:address', (data:{ address: string }) => {
    buyerModel.setAddress(data.address);
});

events.on('buyer:changed', () => {
    validateOrderForm();
    validateContactForm();
    formOrder.payment = buyerModel.getData().payment;
});


// Отображение формы контактов
const formContactElement = cloneTemplate('#contacts');
const formContact = new FormContact(formContactElement, events);

events.on('order:submit', () => {
    const buyerData = buyerModel.getData();
    const errors = buyerModel.validate();
    const hasErrors = errors.email || errors.phone;

    let errorText = '';
    if (errors.email) errorText += errors.email + '. ';
    if (errors.phone) errorText += errors.phone + '. ';

    modal.content = formContact.render({
        ...buyerData,
        valid: !hasErrors,
        errors: errorText
    });
});

events.on('contact:email', (data:{ email: string }) => {
    buyerModel.setEmail(data.email);
});

events.on('contact:phone', (data:{ phone: string }) => {
    buyerModel.setPhone(data.phone);
});


// Отображение формы Success
const successElement = cloneTemplate('#success');
const success = new Success(successElement, events);

events.on('contact:submit', () => {
    const buyerData = buyerModel.getData();
    const cartItems = cartModel.getItems();
    const total = cartModel.getTotalPrice();

    const orderData: IOrderRequest = {
        payment: buyerData.payment,
        email: buyerData.email,
        phone: buyerData.phone,
        address: buyerData.address,
        total: total,
        items: cartItems.map(item => item.id)
    };

    webLarekApi.createOrder(orderData)
        .then(response => {
            console.log('[DEBUG] Заказ успешно создан:', response);

            modal.content = success.render({
                description: `Списано ${total} синапсов`
            });

            cartModel.clear();
            header.render({ counter: 0 });
            buyerModel.clear();
        })
        .catch(error => {
            console.error('[DEBUG] Ошибка при создании заказа:', error);
            formContact.errors = 'Не удалось оформить заказ. Попробуйте снова.';
        });
});

events.on('success:close', () => {
    modal.close();
});


// Функция создания содержимого корзины
function createBasketContent(): HTMLElement {
    const basketElements: HTMLElement[] = [];
    const baskettList = cartModel.getItems();

    baskettList.forEach((product, index) => {
        const cardBasketElement = cloneTemplate('#card-basket');
        const cardBasket = new CardBasket(cardBasketElement, {
            onClick: () => events.emit('cardBasket:delete', product)
        });
        const newBasketElement = cardBasket.render({
            ...product,
            index: index + 1
        });
        basketElements.push(newBasketElement);
    });

    return basket.render({
        list: basketElements,
        price: cartModel.getTotalPrice(),
        valid: baskettList.length > 0
    });
}


// Функция валидации формы заказа
function validateOrderForm() {
    const errors = buyerModel.validate();
    const hasErrors = errors.payment || errors.address;

    let errorText = '';
    if (errors.payment) errorText += errors.payment + '. ';
    if (errors.address) errorText += errors.address + '. ';

    formOrder.errors = errorText;
    formOrder.valid = !hasErrors;
}


// Функция валидации формы контактов
function validateContactForm() {
    const errors = buyerModel.validate();
    const hasErrors = errors.email || errors.phone;

    let errorText = '';
    if (errors.email) errorText += errors.email + '. ';
    if (errors.phone) errorText += errors.phone + '. ';

    formContact.errors = errorText;
    formContact.valid = !hasErrors;
}