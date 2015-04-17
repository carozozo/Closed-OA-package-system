var cfg = {
    'hostName': 'oa-dev.travelglobal.com',
    'port': 53010,
    'isProduction': false,
    'travelGlobalHostName': 'www-dev.travelglobal.com',
    'apiUrl': {
        'agencyUrl': 'http://192.168.11.63:53010/agency-member-webservice/rest/',
        'otaUrl': 'http://192.168.11.63:53010/agency-member-webservice/rest/',
        'eWalletUrl': 'http://192.168.11.63:53020/ewallet-webservice/rest/',
        'oaUrl': 'http://192.168.12.51:8080/oa/rest/',
        'paymentUrl': 'http://192.168.11.63:53070/payment-webservice/rest/',
        'orderUrl': 'http://192.168.11.63:53060/order-webservice/rest/',
        'smsUrl': 'http://api.accessyou.com/sms/sendsms-utf8.php?pwd=45644429&accountno=11008487'
    },
    'redisStoreOptions': {
        'host': '192.168.12.51',
        'port': 6379,
        'db': 2,
        'ttl': 1800
    },
    'amqpConnectOptions': {
        'host': '192.168.11.67',
        'port': 5672,
        'login': 'tg.package',
        'password': 'tg.package',
//        'vhost': 'tg.development'
        'vhost': 'tg.integration'
    }
};

module.exports = cfg;