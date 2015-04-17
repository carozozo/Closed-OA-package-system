var base = require('../base');
base.initOnConfig();

// opt for email-content: targetEmail / localeId / orderNo
// opt for orderDocument: orderId / orderTransactionId / targetEmail / [storeDb]
// opt for orderReceipt: orderNo / contactPerson / contactEmail / contactPhone /
// paymentSuccessDate / paymentAmountFull / merchandiseSubtotalFull /
// couponFull / paymentType / eWalletAmountFull / creditCardAmountFull
// oaEvent / oaHotel / oaFlight

// opt for oEvent: eventName / scheduleDate / scheduleName / serviceClassName /
// eventAddress / saPolicy / oaEventFare
// opt for oEvent.oaEventFare: eachPriceFull / guestTypeName / quantity / totalPriceFull

// opt for oHotel: eachPriceFull / rooms / totalPriceFull / hotelName / roomTypeName /
// bedTypeName / checkInDate / checkOutDate / nights / hotelComplimentaryServices /
// hotelAddress / saPolicy / oaHotelRoomRate
// opt for oHotel.oaHotelRoomRate: reservationDate / eachPriceFull / rooms / nights

// opt for oFlight: 從缺
tm.orderEmail.sendOrderReceiptEmailCbC({
    targetEmail: 'caro.huang@travelglobal.com',
    storeDb: 'false',
    localeId: 'zh_cn',
    orderNo: '123123',
    contactPerson: 'Caro Huang',
    contactEmail: '',
    contactPhone: '0958111111',
    paymentSuccessDate: '2014/12/11',
    paymentAmountFull: '10000',
    oaEvent: [
        {
            eventName: '水舞間',
            scheduleDate: '2013年11月3日 星期六',
            scheduleName: '17:00',
            serviceClassName: 'A 區',
            eventAddress: '',
            policy: '',
            oaPrice: [
                {
                    eachPriceFull: 'HKD $980',
                    guestTypeName: '成人',
                    quantity: '2',
                    totalPriceFull: 'HK $1,960'
                },
                {
                    eachPriceFull: 'HK $680',
                    guestTypeName: '孩童',
                    quantity: '1',
                    totalPriceFull: 'HK $680'
                }
            ]
        },
        {
            eventName: '香港海洋公园',
            scheduleDate: '2013年11月4日 星期日',
            scheduleName: '',
            serviceClassName: '公众人仕',
            eventAddress: '',
            oaPrice: [
                {
                    eachPriceFull: 'TWD $1,072',
                    guestTypeName: '成人',
                    quantity: '2',
                    totalPriceFull: 'TWD $2,144'
                }
            ]
        }
    ],
    oaHotel: [
        {
            eachPriceFull: 'HKD $4,020',
            rooms: '3',
            totalPriceFull: 'HK $8,040',
            hotelName: 'Garden Guest House (New HK Las Vegas Group)',
            roomTypeName: '不限房型',
            bedTypeName: '四人房',
            checkInDate: '2013年11月10日 星期六',
            checkOutDate: '2013年11月13日 星期六',
            nights: '3',
            hotelComplimentaryServices: '免費早餐，免費無線網路',
            hotelAddress: '日本國大阪府大阪市中央區城見1-4-1',
            policy: 'Confirmation is subject to availability of event tickets.\nNon-refundable, and no name change/date change is allowed once booking is confirmed.\nFor program details of the event, please refer to the official website.\nConfirmation is subject to availability of event tickets.\nNon-refundable, and no name change/date change is allowed once booking is confirmed.\nFor program details of the event, please refer to the official website.',
            oaHotelRoomRate: [
                {
                    reservationDate: '11月10日',
                    eachPriceFull: 'HKD $1,500',
                    rooms: '1',
                    nights: '1'
                },
                {
                    reservationDate: '11月11日',
                    eachPriceFull: 'HKD $1,500',
                    rooms: '1',
                    nights: '1'
                },
                {
                    reservationDate: '11月12日',
                    eachPriceFull: 'HKD $1,300',
                    rooms: '1',
                    nights: '1'
                }
            ]
        }
    ],
    oaFlight: [],
    merchandiseSubtotalFull: 'HKD $22,740',
    couponFull: 'HKD $50',
    totalPriceFull: 'HKD $22,690',
    paymentType: '混合支付',
    eWalletAmountFull: 'HKD $1,000',
    creditCardAmountFull: 'HKD $2,1690',
    tgCompanyName: '香港游世界旅行社有限公司',
    tgCompanyAddress: '香港葵涌工業街2-8號力豐工業大廈11樓A室',
    tgCompanyPhone: '+852 3543 1926'
}, function (err, response) {
    tl.console.log2('err=', err);
    tl.console.log2('response=', response);
});