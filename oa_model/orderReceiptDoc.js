tmd.orderReceiptDoc = function (data) {
    var localeId = data.localeId;

    (function setContact() {
        var oContact = data.contact;
        if (!oContact) {
            return;
        }
        var email = oContact.email ? oContact.email : '';
        var personName = oContact.personName ? oContact.personName : '';
        var personTitle = oContact.personTitle ? oContact.personTitle : '';
        var phoneAreaCode = oContact.phoneAreaCode ? oContact.phoneAreaCode : '';
        var phoneCountryCode = oContact.phoneCountryCode ? oContact.phoneCountryCode : '';
        var phoneNumber = oContact.phoneNumber ? oContact.phoneNumber : '';

        var contactPerson = personTitle + '. ' + personName;
        var contactPhone = tl.helper.composePhoneNum(phoneCountryCode, phoneAreaCode, phoneNumber);
        data.contactEmail = (email) ? email : '';
        data.contactPerson = contactPerson;
        data.contactPhone = contactPhone;
        data.oContact = oContact;
    })();
    (function setPaymentAmountFull() {
        var paymentAmount = data.paymentAmount;
        var paymentCurrencyCode = data.paymentCurrencyCode;
        data.paymentAmountFull = tl.string.formatMoney(paymentAmount, {
            prefix: paymentCurrencyCode
        });
    })();
    (function setAggregate() {
        var oAggregate = data.aggregate;
        if (!oAggregate) {
            return;
        }
        (function setInfoByOrders() {
            var oaOrder = oAggregate.orders;
            if (!oaOrder) {
                return;
            }
            tl.object.eachObj(oaOrder, function (i, oOrder) {
                data.orderNo = oOrder.orderNo;
            });
        })();
        (function setInfoByPayments() {
            var oaPayment = oAggregate.payments;
            if (!oaPayment) {
                return;
            }
            tl.object.eachObj(oaPayment, function (i, oPayment) {
                var paymentStatus = oPayment.paymentStatus;
                var recordCreatedAt = oPayment.recordCreatedAt;
                if (paymentStatus.toUpperCase() === 'SUCCESS') {
                    data.paymentSuccessDateFull = tl.dateTime.formatDateTime(recordCreatedAt, 'weekDate');
                }
            });
        })();
        (function setInfoByPaymentTransactions() {
            var oaPaymentTransaction = oAggregate.paymentTransactions;
            if (!oaPaymentTransaction) {
                return;
            }
            tl.object.eachObj(oaPaymentTransaction, function (i, oPaymentTransaction) {
                var paymentTransactionStatus = oPaymentTransaction.paymentTransactionStatus;
                var paymentGatewayId = oPaymentTransaction.paymentGatewayId;
                var currencyCode = oPaymentTransaction.currencyCode;
                var amount = oPaymentTransaction.amount;
                var amountFull = tl.string.formatMoney(amount, {
                    prefix: currencyCode
                });
                if (paymentTransactionStatus.toUpperCase() === 'SUCCESS') {
                    switch (paymentGatewayId.toUpperCase()) {
                        case 'EWALLET':
                            data.eWalletAmountFull = amountFull;
                            break;
                        case 'MOTO':
                        case 'ECPG':
                            data.creditAmountFull = amountFull;
                            break;
                        default :
                            break;
                    }
                }
            });
        })();
        (function setInfoByProducts() {
            var oaProduct = oAggregate.products;
            var aTerms = [];
            if (!oaProduct) {
                return;
            }
            tl.object.eachObj(oaProduct, function (i, oProduct) {
                var oEventName = oProduct.eventName;
                var serviceClassName = oProduct.serviceClassName;
                var scheduleName = oProduct.scheduleName;

                oProduct.eventName = (oEventName && oEventName[localeId]) ? oEventName[localeId] : '';
                oProduct.serviceClassName = (serviceClassName && serviceClassName[localeId]) ? serviceClassName[localeId] : '';
                oProduct.scheduleName = (scheduleName && scheduleName[localeId]) ? scheduleName[localeId] : '';

                (function setInfoByMappingLineItem() {
                    var oaLineItem = oAggregate.lineItems;
                    if (!oaLineItem) {
                        return;
                    }
                    tl.object.eachObj(oaLineItem, function (i, oLineItem) {
                        var productId = oLineItem.productId;
                        if (productId === oProduct.productId) {
                            (function setTotalPrice() {
                                var oDisplayPrice = oLineItem.displayPrice;
                                if (!oDisplayPrice) {
                                    return;
                                }
                                var currencyCode = oDisplayPrice.currencyCode;
                                var salePrice = oDisplayPrice.salePrice;
                                oProduct.totalPriceFull = tl.string.formatMoney(salePrice, {
                                    prefix: currencyCode
                                });
                                oProduct.oDisplayPrice = oDisplayPrice;
                            })();
                        }
                    });
                })();

                (function setScheduleDate() {
                    oProduct.scheduleDate = tl.dateTime.formatDateTime(oProduct.scheduleDate, 'weekDate');
                })();

                (function setEventFares() {
                    var oaEventFare = oProduct.eventFares;
                    if (!oaEventFare) {
                        data.quantity = 0;
                        return;
                    }
                    var productQuantity = 0;
                    tl.object.eachObj(oaEventFare, function (i, oEventFare) {
                        oEventFare.guestTypeName = oEventFare.guestTypeName[localeId];
                        (function setPrice() {
                            var oDisplayPrice = oEventFare.displayPrice;
                            var quantity = oEventFare.quantity;
                            var currencyCode = oDisplayPrice.currencyCode;
                            var salePrice = oDisplayPrice.salePrice;
                            var surcharge = oDisplayPrice.surcharge;
                            var tax = oDisplayPrice.tax;
                            var each = salePrice + surcharge + tax;
                            var total = each * quantity;
                            oEventFare.eachPriceFull = tl.string.formatMoney(each, {
                                prefix: currencyCode
                            });
                            oEventFare.totalPriceFull = tl.string.formatMoney(total, {
                                prefix: currencyCode
                            });
                        })();
                        oaEventFare[i] = oEventFare;
                        productQuantity += (oEventFare.quantity) ? oEventFare.quantity : 0;
                    });
                    oProduct.quantity = productQuantity;
                    oProduct.oaEventFare = oaEventFare;
                })();

                (function setTravelglobalPolicyList() {
                    var travelglobalPolicy = oProduct.travelglobalPolicy ? oProduct.travelglobalPolicy[localeId] : null;
                    travelglobalPolicy = oProduct.eventName + ':\n' + travelglobalPolicy;
                    aTerms = tl.array.pushNoDup(aTerms, travelglobalPolicy);
                })();
            });
            data.terms = aTerms.join('\r\n\r\n');
            data.oaProduct = oaProduct;
        })();
    })();
    return data;
};