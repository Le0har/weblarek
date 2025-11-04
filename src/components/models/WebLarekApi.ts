import { IApi, IProductListResponse, IOrderRequest, IOrderResponse } from '../../types/index.ts';

export class WebLarekApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProductList(): Promise<IProductListResponse> {
        return this.api.get<IProductListResponse>('/product');
    }

    createOrder(data: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order', data);
    }

}
