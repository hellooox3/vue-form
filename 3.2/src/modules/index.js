export class AddressModel{
    address1 = "";
    address2 = "";
    cityTown = "";
    stateProvince = "";
    postalCode = "";
}

export class ShippingModel {
    fullName = "";
    company = "";
    address = new AddressModel();
}

export class BillingModel extends ShippingModel{
    sameAsShipping = false;
}

export class CreditCardModel {
    number = "";
    nameOnCard = "";
    expirationMonth = 0;
    expirationYear = 0;
    cvv = "";
}