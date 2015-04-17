var cfg = {
    'productIps': ["192.168.110.91", "192.168.111.91"],
    'devIps': ["192.168.12.51"],
    'webTitle': 'TravelGlobal-PKG',
    'httpRequestUserKey': 'Travelglobal-User-Id',
    'template': {
        'aCss': [
            '3rdparty',
            'css'
        ],
        'aJs': [
            '3rdparty/jquery',
            '3rdparty/jquery_ui',
            '3rdparty/jquery_inputmask',
            '3rdparty/bootstrap',
            '3rdparty',
            'js/main.js',
            'js/ajax',
            'js/lib',
            'js/language',
            'js/model',
            'js/extend_lib',
            'js/extend_init',
            'js/module',
            'js/page'
        ]
    },
    'redisStoreOptions': {
        'host': '192.168.12.51',
        'port': 6379,
        'db': 2,
        'ttl': 1800
    },
    'sessionOptions': {
        'key': '',
        'secret': '35cb2890c5560878c7199d88b92457776b7ecd9e',
        'cookie': {
            'path': '/',
            'httpOnly': true,
            'maxAge': 1200000
        },
        'resave': true,
        'saveUninitialized': true,
        'proxy': null
    },
    'mailer': {
        'transportOptions': {
            'host': 'smtp.travelglobal.com',
            'secureConnection': false,
            'port': 587,
            'auth': {
                'user': 'no-reply@travelglobal.com',
                'pass': 'n0_R3!@#'
            },
            'xMailer': false
        },
        'mailOptions': {
            'from': 'service@travelglobal.com',
            'replyTo': 'service@travelglobal.com'
        }
    },
    'amqp': {
        connectSecondOptions: {
            'reconnect': true,
            'reconnectBackoffTime': 6000
        },
        'exchangeConfig': {
            name: 'pkg.topic',
            options: {
                durable: true,
                autoDelete: false,
                confirm: true
            }
        },
        'queueOptions': {
            durable: true,
            autoDelete: false
        },
        'queueNames': {
            'orderReceiptMsgRequest': 'pkg.orderMsg.orderReceiptRequest',
            'paymentConfirmedMsgRequest': 'pkg.orderMsg.paymentConfirmedRequest',
            'paymentRejectedMsgRequest': 'pkg.orderMsg.paymentRejectedRequest',
            'eTicketMsgRequest': 'pkg.orderMsg.eTicketRequest',
            'paymentRefundMsgRequest': 'pkg.orderMsg.paymentRefundRequest',
            'customerMsgRequest': 'pkg.orderMsg.customerMsgRequest',
            "flightItineraryRequest": 'pkg.orderMsg.flightItineraryRequest',
            'hotelVoucherRequest': 'pkg.orderMsg.hotelVoucherRequest',
            'eventVoucherRequest': 'pkg.orderMsg.eventVoucherRequest',
            'pkgMsgRequest': 'pkg.pkgMsgRequest'
        }
    }
};

module.exports = cfg;