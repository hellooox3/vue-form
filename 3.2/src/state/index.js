import { ShippingModel, BillingModel, CreditCardModel } from "@/modules";

export default {
    billing: new BillingModel(),
    Shipping: new ShippingModel(),
    creditCard: new CreditCardModel(),
    error: ""
}