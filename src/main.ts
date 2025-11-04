import './scss/styles.scss';
import { apiProducts } from './utils/data.ts';
import { Products } from './components/models/Products.ts';
import { Cart } from './components/models/Cart.ts';
import { Buyer } from './components/models/Buyer.ts';
import { Api } from './components/base/Api.ts';
import { WebLarekApi } from './components/api/WebLarekApi.ts';
import { API_URL } from './utils/constants.ts';


// Тестирование класса Products
console.log('************************************');
console.log('[DEBUG] Тестирование класса Products');

const productsModel = new Products();

console.log('[DEBUG] getItems() --> null: ', productsModel.getItems());
productsModel.setItems(apiProducts.items);
console.log('[DEBUG] getItems(): ', productsModel.getItems());

console.log('[DEBUG] getItemById("Неверный id") --> null: ', productsModel.getItemById('Неверный id'));
console.log('[DEBUG] getSelectedItem() --> null: ', productsModel.getSelectedItem());

const itemById = productsModel.getItemById('854cef69-976d-4c2a-a18c-2aa45046c390');
console.log('[DEBUG] getItemById("Верный id"): ', itemById);

if (itemById) {
    productsModel.setSelectedItem(itemById);
}

console.log('[DEBUG] getSelectedItem(): ', productsModel.getSelectedItem());


// Тестирование класса Cart
console.log('************************************');
console.log('[DEBUG] Тестирование класса Cart');

const cartModel = new Cart();

console.log('[DEBUG] getItems() --> null: ', cartModel.getItems());
cartModel.removeItem(apiProducts.items[0]);

cartModel.addItem(apiProducts.items[0]);
cartModel.addItem(apiProducts.items[1]);
cartModel.addItem(apiProducts.items[2]);
cartModel.addItem(apiProducts.items[3]);
console.log('[DEBUG] getItems(): ', cartModel.getItems());

cartModel.removeItem(apiProducts.items[0]);
console.log('[DEBUG] getItems(): ', cartModel.getItems());

console.log('[DEBUG] getTotalPrice(): ', cartModel.getTotalPrice());
console.log('[DEBUG] getItemsCount(): ', cartModel.getItemsCount());

console.log('[DEBUG] hasItem("Неверный id") --> false: ', cartModel.hasItem('Неверный id'));
console.log('[DEBUG] hasItem("Верный id") --> true: ', cartModel.hasItem('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'));

cartModel.clear();
console.log('[DEBUG] getItemsCount(): ', cartModel.getItemsCount());


// Тестирование класса Buyer
console.log('************************************');
console.log('[DEBUG] Тестирование класса Buyer');

const buyerModel = new Buyer();

console.log('[DEBUG] getData() --> "": ', buyerModel.getData());
buyerModel.setPayment('cash');
buyerModel.setEmail('test@hop.com');
buyerModel.setPhone('999-88-77');
buyerModel.setAddress('г. Выдуманный, ул. Задуманная, д. 1');
console.log('[DEBUG] getData() --> Data: ', buyerModel.getData());
console.log('[DEBUG] validate() --> {}: ', buyerModel.validate());

buyerModel.clear();
console.log('[DEBUG] getData() --> "": ', buyerModel.getData());

console.log('[DEBUG] validate() --> errors: ', buyerModel.validate());


// Тестирование класса WebLarekApi
console.log('************************************');
console.log('[DEBUG] Тестирование класса WebLarekApi');

const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);

const getRequest = webLarekApi.getProductList();
console.log('[DEBUG] getProductList() --> Promise: ', getRequest);

const productsModelFromApi = new Products();

getRequest.then((data) => {
    console.log('[DEBUG] PromiseResult --> Object', data);
    productsModelFromApi.setItems(data.items);
    console.log('[DEBUG] getItems(): ', productsModelFromApi.getItems());
}).catch(error => {
    console.error('[DEBUG] Ошибка при загрузке товаров с сервера:', error);
});
