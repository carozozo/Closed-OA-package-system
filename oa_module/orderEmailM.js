tm.orderEmail = (function () {
    tg.emitter.on('initOnStart', function () {
        tl.msgType.addMsgMainType([
            typeOrderEmail
        ]);
        tl.msgType.addMsgSubType([
            typeOrderReceiptEmail,
            typeOrderReceiptEmail,
            typePaymentConfirmedEmail,
            typePaymentRejectedEmail,
            typeEticketEmail,
            typePaymentRefundEmail,
            typeFlightItineraryEmail,
            typeHotelVoucherEmail
        ]);
    });
    var self = {};
    // https://github.com/devongovett/node-wkhtmltopdf, http://wkhtmltopdf.org/downloads.html
    var wkhtmltopdf = require('wkhtmltopdf');
    var typeOrderEmail = 'orderEmail';
    var typeOrderReceiptEmail = 'orderReceiptEmail';
    var typePaymentConfirmedEmail = 'paymentConfirmedEmail';
    var typePaymentRejectedEmail = 'paymentRejectedEmail';
    var typeEticketEmail = 'eTicketEmail';
    var typePaymentRefundEmail = 'paymentRefundEmail';
    var typeFlightItineraryEmail = 'flightItineraryEmail';
    var typeHotelVoucherEmail = 'hotelVoucherEmail';
    var typeEventVoucherEmail = 'eventVoucherEmail';
    var orderDocDirFull = (function () {
        var orderDocDirFull = tl.files.normalizePath(tg.filesDirFull, 'order_document');
        // create dir for order_doc
        tl.files.createDir(orderDocDirFull);
        return orderDocDirFull;
    })();
    var getOrderPdfName = function (pdfName, orderNo, index) {
        var sTime = tl.dateTime.formatNow('YYYYMMDD-HHmmss');
        var arr = [pdfName, orderNo, '-', sTime];
        if (index) {
            arr.push('_');
            arr.push(index);
        }
        arr.push('.pdf');
        return arr.join('');
    };
    var getPrintDate = function (opt) {
        return tl.dateTime.formatNow('weekDate', {
            locale: opt.localeId
        });
    };
    var getOrderReceiptDocCb = function (opt, cb) {
        var localeId = opt.localeId;
        var orderReceiptDocLang = tl.language.getLangByLocaleId(tla.orderReceiptDoc, localeId);
        var tgCompanyInfoLang = tl.language.getLangByLocaleId(tla.tgCompanyInfo, localeId);
        opt = tl.object.extendObj(opt, orderReceiptDocLang);
        opt = tl.object.extendObj(opt, tgCompanyInfoLang);
        tm.emailDoc.getEmailTemplateCbrC('order/orderReceiptDoc', opt, function (ret) {
            cb && cb(ret);
        });
    };
    var getEventVoucherDocCb = function (opt, cb) {
        var localeId = opt.localeId;
        var eventVoucherDocLang = tl.language.getLangByLocaleId(tla.eventVoucherDoc, localeId);
        var path = (function () {
            var path = 'order/event/';
            var eventCategory = tl.string.lowerStr(opt.eventCategory);
            var eventSubCategory = opt.eventSubCategories && tl.string.lowerStr(opt.eventSubCategories[0]) || '';
            switch (eventCategory) {
                case 'event':
                    path += 'event';
                    break;
                case 'transport':
                    path += 'transport';
                    break;
            }
            path += '/';
            switch (eventSubCategory) {
                case 'dining':
                    path += 'diningVoucherDoc';
                    break;
                case 'sports':
                    path += 'sportsVoucherDoc';
                    break;
                case 'ticket':
                    path += 'ticketVoucherDoc';
                    break;
                case 'ferry':
                    path += 'ferryVoucherDoc';
                    break;
                default :
                    // use commonVoucherDoc.html when eventSubCategories is empty
                    path += 'commonVoucherDoc';
                    break;
            }
            return path;
        })();
        opt = tl.object.extendObj(opt, eventVoucherDocLang);
        tm.emailDoc.getEmailTemplateCbrC(path, opt, function (ret) {
            cb && cb(ret);
        });
    };
    var getFlightItineraryDocCb = function (opt, cb) {
        var localeId = opt.localeId;
        var flightItineraryDocLang = tl.language.getLangByLocaleId(tla.flightItineraryDoc, localeId);
        var path = 'order/flight/flightItineraryDoc';
        opt = tl.object.extendObj(opt, flightItineraryDocLang);
        tm.emailDoc.getEmailTemplateCbrC(path, opt, function (ret) {
            cb && cb(ret);
        });
    };
    var getHotelVoucherDocCb = function (opt, cb) {
        var localeId = opt.localeId;
        var hotelVoucherDocDocLang = tl.language.getLangByLocaleId(tla.hotelVoucherDoc, localeId);
        var path = 'order/hotel/hotelVoucherDoc';
        opt = tl.object.extendObj(opt, hotelVoucherDocDocLang);
        tm.emailDoc.getEmailTemplateCbrC(path, opt, function (ret) {
            cb && cb(ret);
        });
    };
    var coverToHtmlModelAndEmailContent = function (content, localeId) {
        var generalEmailContentLang = tla.generalEmailContent;
        generalEmailContentLang = tl.language.getLangByLocaleId(generalEmailContentLang, localeId);
        var contentFirst = generalEmailContentLang.contentFirst();
        var contentLast = generalEmailContentLang.contentLast();
        return {
            htmlModel: {
                contentFirst: contentFirst,
                content: content,
                contentLast: contentLast
            },
            emailContent: contentFirst + '\r\n' + content + '\r\n' + contentLast
        };
    };
    var coverToEmailObj = function (emailSubject, emailContent, emailHtml) {
        return {
            emailSubject: emailSubject,
            emailContent: emailContent,
            emailHtml: emailHtml
        };
    };
    var sendMailAndCreateOrderDocRecordCb = function (opt, cb) {
        var type = opt.type;
        // opt for emailDoc
        opt.mainType = typeOrderEmail;
        opt.subType = type;
        opt.to = opt.targetEmail;
        opt.subject = opt.emailSubject;
        opt.text = opt.emailContent;
        opt.html = opt.emailHtml;
        // opt for orderDocument
        opt.documentType = type;
        opt.documentTarget = opt.targetEmail;
        opt.documentDescription = opt.documentDescription || opt.emailSubject;
        tm.emailDoc.sendEmailCbC(opt, function (ret) {
            var retErr = ret.getRetErr();
            if (retErr) {
                // opt for orderDocument
                opt.status = 'error';
                opt.documentDescription = retErr;
            }
            tm.orderDocument.createOrderDocumentC(opt);
            cb && cb(ret);
        });
    };

    self.getOrderReceiptEmailCbC = function (opt, cb) {
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var emailLang = tla.orderReceiptEmail;
        emailLang = tl.language.getLangByLocaleId(emailLang, localeId);
        var emailSubject = emailLang.subject(orderNo);
        var content = emailLang.content(orderNo);
        var contentObj = coverToHtmlModelAndEmailContent(content, localeId);
        var htmlModel = contentObj.htmlModel;
        var emailContent = contentObj.emailContent;
        tm.emailDoc.getEmailTemplateCbrC('email', htmlModel, function (ret) {
            var emailHtml = ret.getRetSuc();
            getOrderReceiptDocCb(opt, function (ret) {
                var receiptDocHtml = ret.getRetSuc();
                var emailObj = coverToEmailObj(emailSubject, emailContent, emailHtml);
                emailObj.receiptDocHtml = receiptDocHtml;
                ret.setRetSuc(emailObj);
                cb && cb(ret);
            })
        });
    };
    self.getPaymentConfirmedEmailCbC = function (opt, cb) {
        // localeId/orderNo
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var emailLang = tla.paymentConfirmedEmail;
        emailLang = tl.language.getLangByLocaleId(emailLang, localeId);
        var emailSubject = emailLang.subject(orderNo);
        var content = emailLang.content(orderNo);
        var contentObj = coverToHtmlModelAndEmailContent(content, localeId);
        var htmlModel = contentObj.htmlModel;
        var emailContent = contentObj.emailContent;
        tm.emailDoc.getEmailTemplateCbrC('email', htmlModel, function (ret) {
            var emailHtml = ret.getRetSuc();
            var emailObj = coverToEmailObj(emailSubject, emailContent, emailHtml);
            ret.setRetSuc(emailObj);
            cb && cb(ret);
        });
    };
    self.getPaymentRejectedEmailCbC = function (opt, cb) {
        // localeId/orderNo/paymentFailedTime/paymentDeadline
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var paymentFailedTime = opt.paymentFailedTime;
        var paymentDeadline = opt.paymentDeadline;
        var emailLang = tla.paymentRejectedEmail;
        emailLang = tl.language.getLangByLocaleId(emailLang, localeId);
        var emailSubject = emailLang.subject(orderNo, paymentFailedTime);
        var content = emailLang.content(orderNo, paymentFailedTime, paymentDeadline);
        var contentObj = coverToHtmlModelAndEmailContent(content, localeId);
        var htmlModel = contentObj.htmlModel;
        var emailContent = contentObj.emailContent;
        tm.emailDoc.getEmailTemplateCbrC('email', htmlModel, function (ret) {
            var emailHtml = ret.getRetSuc();
            var emailObj = coverToEmailObj(emailSubject, emailContent, emailHtml);
            ret.setRetSuc(emailObj);
            cb && cb(ret);
        });
    };
    self.getEticketEmailCbC = function (opt, cb) {
        // localeId/orderNo
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var emailLang = tla.eTicketEmail;
        emailLang = tl.language.getLangByLocaleId(emailLang, localeId);
        var emailSubject = emailLang.subject(orderNo);
        var content = emailLang.content(orderNo);
        var contentObj = coverToHtmlModelAndEmailContent(content, localeId);
        var htmlModel = contentObj.htmlModel;
        var emailContent = contentObj.emailContent;
        tm.emailDoc.getEmailTemplateCbrC('email', htmlModel, function (ret) {
            var emailHtml = ret.getRetSuc();
            var emailObj = coverToEmailObj(emailSubject, emailContent, emailHtml);
            ret.setRetSuc(emailObj);
            cb && cb(ret);
        });
    };
    self.getPaymentRefundEmailCbC = function (opt, cb) {
        // localeId/orderNo
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var emailLang = tla.paymentRefundEmail;
        emailLang = tl.language.getLangByLocaleId(emailLang, localeId);
        var emailSubject = emailLang.subject(orderNo);
        var content = emailLang.content(orderNo);
        var contentObj = coverToHtmlModelAndEmailContent(content, localeId);
        var htmlModel = contentObj.htmlModel;
        var emailContent = contentObj.emailContent;
        tm.emailDoc.getEmailTemplateCbrC('email', htmlModel, function (ret) {
            var emailHtml = ret.getRetSuc();
            var emailObj = coverToEmailObj(emailSubject, emailContent, emailHtml);
            ret.setRetSuc(emailObj);
            cb && cb(ret);
        });
    };
    self.getEventVoucherEmailCbC = function (opt, cb) {
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var emailLang = tl.language.getLangByLocaleId(tla.eTicketEmail, localeId);
        var emailSubject = emailLang.subject(orderNo);
        var content = emailLang.content(orderNo);
        var contentObj = coverToHtmlModelAndEmailContent(content, localeId);
        var htmlModel = contentObj.htmlModel;
        var emailContent = contentObj.emailContent;
        tm.emailDoc.getEmailTemplateCbrC('email', htmlModel, function (ret) {
            var emailHtml = ret.getRetSuc();
            opt.printDate = getPrintDate(opt);
            getEventVoucherDocCb(opt, function (ret) {
                var eventVoucherDocHtml = ret.getRetSuc();
                var emailObj = coverToEmailObj(emailSubject, emailContent, emailHtml);
                emailObj.eventVoucherDocHtml = eventVoucherDocHtml;
                ret.setRetSuc(emailObj);
                cb && cb(ret);
            });
        });
    };
    self.getFlightItineraryEmailCbC = function (opt, cb) {
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var emailLang = tl.language.getLangByLocaleId(tla.eTicketEmail, localeId);
        var emailSubject = emailLang.subject(orderNo);
        var content = emailLang.content(orderNo);
        var contentObj = coverToHtmlModelAndEmailContent(content, localeId);
        var htmlModel = contentObj.htmlModel;
        var emailContent = contentObj.emailContent;
        tm.emailDoc.getEmailTemplateCbrC('email', htmlModel, function (ret) {
            var emailHtml = ret.getRetSuc();
            var oaFlightDoc = opt.oaFlightDoc || [];
            var emailObj = coverToEmailObj(emailSubject, emailContent, emailHtml);
            emailObj.saFlightItineraryDocHtml = [];
            tl.object.eachObj(oaFlightDoc, function (i, oFlightDoc) {
                oFlightDoc.localeId = localeId;
                oFlightDoc.orderNo = orderNo;
                oFlightDoc.printDate = getPrintDate(opt);
                getFlightItineraryDocCb(oFlightDoc, function (ret) {
                    var flightItineraryDocHtml = ret.getRetSuc();
                    emailObj.saFlightItineraryDocHtml.push(flightItineraryDocHtml);
                    ret.setRetSuc(emailObj);
                    (i == oaFlightDoc.length - 1) && cb && cb(ret);
                });
            });
        });
    };
    self.getHotelVoucherEmailCbC = function (opt, cb) {
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var emailLang = tl.language.getLangByLocaleId(tla.eTicketEmail, localeId);
        var emailSubject = emailLang.subject(orderNo);
        var content = emailLang.content(orderNo);
        var contentObj = coverToHtmlModelAndEmailContent(content, localeId);
        var htmlModel = contentObj.htmlModel;
        var emailContent = contentObj.emailContent;
        tm.emailDoc.getEmailTemplateCbrC('email', htmlModel, function (ret) {
            var emailHtml = ret.getRetSuc();
            opt.printDate = getPrintDate(opt);
            getHotelVoucherDocCb(opt, function (ret) {
                var hotelVoucherDocHtml = ret.getRetSuc();
                var emailObj = coverToEmailObj(emailSubject, emailContent, emailHtml);
                emailObj.hotelVoucherDocHtml = hotelVoucherDocHtml;
                ret.setRetSuc(emailObj);
                cb && cb(ret);
            });
        });
    };
    self.sendOrderReceiptEmailCbC = function (opt, cb) {
        // opt for email-content: targetEmail/localeId/orderNo
        // opt for orderDocument: orderId/orderTransactionId/targetEmail/[storeDb]
        // opt for orderReceipt: orderNo/contactPerson/contactEmail/contactPhone/
        // paymentSuccessDate/paymentAmountFull/merchandiseSubtotalFull/
        // couponFull/paymentType/eWalletAmountFull/creditCardAmountFull
        // oaEvent/oaHotel/oaFlight

        // opt for oEvent: eventName/scheduleDate/scheduleName/serviceClassName/
        // eventAddress/saPolicy/oaEventFare
        // opt for oEvent.oaEventFare: eachPriceFull/guestTypeName/quantity/totalPriceFull

        // opt for oHotel: eachPriceFull/rooms/totalPriceFull/hotelName/roomTypeName/
        // bedTypeName/checkInDate/checkOutDate/nights/hotelComplimentaryServices/
        // hotelAddress/saPolicy/oaHotelRoomRate
        // opt for oHotel.oaHotelRoomRate: reservationStartDate/reservationEndDate/eachPriceFull/
        // rooms/nights

        // opt for oFlight: departureCityName/arrivalCityName/airlineName/airlineCode/
        // flightNumber/departureDate/cabinClass/saAmendmentPolicy/saRefundPolicy/
        // saEndorsementPolicy/bookingClassCode/notices/oaFlightFare
        // opt for oFlight.oaFlightFare: eachPriceFull/chargePriceFull/guestTypeName/quantity/
        // totalPriceFull
        var orderNo = opt.orderNo;
        var sTime = tl.dateTime.formatNow('YYYYMMDD-HHmmss');
        var pdfName = 'orderReceipt' + orderNo + '-' + sTime + '.pdf';
        var pdfPath = tl.files.normalizePath(orderDocDirFull, pdfName);
        self.getOrderReceiptEmailCbC(opt, function (ret) {
            var htmlOpt = ret.getRetSuc();
            var receiptDocHtml = htmlOpt.receiptDocHtml;
            var pdfOpt = {
                output: pdfPath,
                encoding: 'utf-8'
            };
            opt = tl.object.extendObj(opt, htmlOpt);
            wkhtmltopdf(receiptDocHtml, pdfOpt, function () {
                // opt for emailDoc
                opt.attachments = [
                    {
                        filename: 'order_receipt.pdf',
                        filePath: pdfPath
                    }
                ];
                // opt for orderDocument
                opt.type = typeOrderReceiptEmail;
                opt.documentDescription = pdfName;
                sendMailAndCreateOrderDocRecordCb(opt, cb);
            });
        });
    };
    self.sendPaymentConfirmedEmailCbC = function (opt, cb) {
        // opt for email-content: targetEmail/localeId/orderNo
        // opt for orderDocument: orderId/orderTransactionId/targetEmail/[storeDb]
        self.getPaymentConfirmedEmailCbC(opt, function (ret) {
            var htmlOpt = ret.getRetSuc();
            opt = tl.object.extendObj(opt, htmlOpt);
            opt.type = typePaymentConfirmedEmail;
            sendMailAndCreateOrderDocRecordCb(opt, cb);
        });
    };
    self.sendPaymentRejectedEmailCbC = function (opt, cb) {
        // opt for email-content: targetEmail/localeId/orderNo/paymentFailedTime/paymentDeadline
        // opt for orderDocument: orderId/orderTransactionId/targetEmail/[storeDb]
        self.getPaymentRejectedEmailCbC(opt, function (ret) {
            var htmlOpt = ret.getRetSuc();
            opt = tl.object.extendObj(opt, htmlOpt);
            opt.type = typePaymentRejectedEmail;
            sendMailAndCreateOrderDocRecordCb(opt, cb);
        });
    };
    self.sendEticketEmailCbC = function (opt, cb) {
        // opt for email-content: targetEmail/localeId/orderNo/aAttachmentOpt
        // opt for orderDocument: orderId/orderTransactionId/targetEmail/fileNames/[storeDb]
        var aAttachmentOpt = opt.aAttachmentOpt;
        var fileNames = opt.fileNames;
        self.getEticketEmailCbC(opt, function (ret) {
            var htmlOpt = ret.getRetSuc();
            opt = tl.object.extendObj(opt, htmlOpt);
            // opt for emailDoc
            opt.attachments = aAttachmentOpt;
            // opt for orderDocument
            opt.type = typeEticketEmail;
            opt.documentDescription = fileNames;
            sendMailAndCreateOrderDocRecordCb(opt, cb);
        });
    };
    self.sendEventVoucherEmailCbC = function (opt, cb) {
        // opt for email-content: targetEmail/localeId/orderNo
        // opt for orderDocument: orderId/orderTransactionId/targetEmail/[storeDb]
        // opt to get emailDoc-path: eventCategory/eventSubCategories
        // opt for eventVoucher-all: guestName/supplierConfirmationCode/orderNo/
        // printDate/eventName/scheduleDate/serviceClassName/aEventInfo/
        // oaEventFare/saPolicy/isB2b
        // opt for eventVoucher-transport: originDistrictName/originLocationName/
        // destinationDistrictName/destinationLocationName
        // opt in oEventFare: guestTypeName/quantity
        var orderNo = opt.orderNo;
        var sTime = tl.dateTime.formatNow('YYYYMMDD-HHmmss');
        var pdfName = getOrderPdfName('eventVoucher', orderNo);
        var pdfPath = tl.files.normalizePath(orderDocDirFull, pdfName);
        // Note: set printDate
        self.getEventVoucherEmailCbC(opt, function (ret) {
            var htmlOpt = ret.getRetSuc();
            var eventVoucherDocHtml = htmlOpt.eventVoucherDocHtml;
            var pdfOpt = {
                output: pdfPath,
                encoding: 'utf-8'
            };
            opt = tl.object.extendObj(opt, htmlOpt);
            wkhtmltopdf(eventVoucherDocHtml, pdfOpt, function () {
                // opt for emailDoc
                opt.attachments = [
                    {
                        filename: 'event_voucher_' + sTime + '.pdf',
                        filePath: pdfPath
                    }
                ];
                // opt for orderDocument
                opt.type = typeEventVoucherEmail;
                opt.documentDescription = pdfName;
                sendMailAndCreateOrderDocRecordCb(opt, cb);
            });
        });
    };
    self.sendFlightItineraryEmailCbC = function (opt, cb) {
        // opt for email-content: targetEmail/localeId/orderNo
        // opt for orderDocument: orderId/orderTransactionId/targetEmail/[storeDb]
        // opt for get pdfFile: oaFlightDoc
        // opt in oFlightDoc: oaFlight
        // opt in each oFlight: passengerTypeCode/passengerName/eTicketNo/orderNo/
        // airlineName/airlineCode/flightNumber/cabinClass/aircraftName/stops/
        // departureDate/departureTime/departureAirportName/departureAirportCode/
        // departureTerminal/arrivalDate/arrivalTime/arrivalAirportName/
        // arrivalAirportCode/arrivalTerminal/bookingRef/saAmendmentPolicy/
        // saRefundPolicy/saEndorsementPolicy/bookingClassCode/notices/isB2b
        var orderNo = opt.orderNo;
        var sTime = tl.dateTime.formatNow('YYYYMMDD-HHmmss');
//    var pdfName = 'flightItinerary' + orderNo + '-' + sTime + '.pdf';
//    var pdfPath = tl.files.normalizePath(orderDocDirFull, pdfName);
        opt.attachments = [];
        self.getFlightItineraryEmailCbC(opt, function (ret) {
            var htmlOpt = ret.getRetSuc();
            var count = 0;
            var aFileName = [];
            var saFlightItineraryDocHtml = htmlOpt.saFlightItineraryDocHtml;
            var fileCount = saFlightItineraryDocHtml.length;
            var toPdfFile = function (sFlightItineraryDocHtml) {
                count++;
                var pdfName = getOrderPdfName('flightItinerary', orderNo, count);
                var pdfPath = tl.files.normalizePath(orderDocDirFull, pdfName);
                var pdfOpt = {
                    output: pdfPath,
                    encoding: 'utf-8'
                };
                opt = tl.object.extendObj(opt, htmlOpt);
                wkhtmltopdf(sFlightItineraryDocHtml, pdfOpt, function () {
                    // opt for emailDoc
                    opt.attachments.push({
                        filename: 'flight_itinerary_' + sTime + '_' + count + '.pdf',
                        filePath: pdfPath
                    });
                    aFileName.push(pdfName);
                    if (count < fileCount) {
                        toPdfFile(saFlightItineraryDocHtml[count]);
                    }
                    else {
                        // opt for orderDocument
                        opt.type = typeFlightItineraryEmail;
                        opt.documentDescription = aFileName.join(';');
                        sendMailAndCreateOrderDocRecordCb(opt, cb);
                    }
                });
            };
            toPdfFile(saFlightItineraryDocHtml[0]);
        });
    };
    self.sendHotelVoucherEmailCbC = function (opt, cb) {
        // opt for email-content: targetEmail/localeId/orderNo
        // opt for orderDocument: orderId/orderTransactionId/targetEmail/[storeDb]
        // opt for hotelVoucher: orderNo/guestName/hotelName/
        // localizedHotelName/hotelAddress/localizedHotelAddress/roomType/
        // hotelComplimentaryServices/checkInDate/checkOutDate/nights/rooms/
        // saRemark(contractRemarks)/saPolicy(cancellationPolicy)/notices/isB2b
        var orderNo = opt.orderNo;
        var sTime = tl.dateTime.formatNow('YYYYMMDD-HHmmss');
        var pdfName = getOrderPdfName('hotelVoucher', orderNo);
        var pdfPath = tl.files.normalizePath(orderDocDirFull, pdfName);
        // Note: set printDate
        self.getHotelVoucherEmailCbC(opt, function (ret) {
            var htmlOpt = ret.getRetSuc();
            var hotelVoucherDocHtml = htmlOpt.hotelVoucherDocHtml;
            var pdfOpt = {
                output: pdfPath,
                encoding: 'utf-8'
            };
            opt = tl.object.extendObj(opt, htmlOpt);
            wkhtmltopdf(hotelVoucherDocHtml, pdfOpt, function () {
                // opt for emailDoc
                opt.attachments = [
                    {
                        filename: 'hotel_voucher_' + sTime + '.pdf',
                        filePath: pdfPath
                    }
                ];
                // opt for orderDocument
                opt.type = typeHotelVoucherEmail;
                opt.documentDescription = pdfName;
                sendMailAndCreateOrderDocRecordCb(opt, cb);
            });
        });
    };
    self.sendPaymentRefundEmailCbC = function (opt, cb) {
        // opt for email-content: targetEmail/localeId/orderNo
        // opt for orderDocument: orderId/orderTransactionId/targetEmail/[storeDb]
        self.getPaymentRefundEmailCbC(opt, function (ret) {
            var htmlOpt = ret.getRetSuc();
            opt = tl.object.extendObj(opt, htmlOpt);
            opt.type = typePaymentRefundEmail;
            sendMailAndCreateOrderDocRecordCb(opt, cb);
        });
    };
    return self;
})();