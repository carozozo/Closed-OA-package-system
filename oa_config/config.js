var cfg = {
    'hostName': 'oa.travelglobal.com',
    'port': 53010,
    'isProduction': true,
    'travelGlobalHostName': 'www.travelglobal.com',
    'apiUrl': {
        'agencyUrl': 'http://agency-member-webservice.tg.idc:53010/agency-member-webservice/rest/',
        'otaUrl': 'http://agency-member-webservice.tg.idc:53010/agency-member-webservice/rest/',
        'eWalletUrl': 'http://ewallet-webservice.tg.idc:53020/ewallet-webservice/rest/',
        'oaUrl': 'http://192.168.110.91:8080/oa/rest/',
        'paymentUrl': 'http://payment-webservice.tg.idc:53070/payment-webservice/rest/',
        'orderUrl': 'http://order-webservice.tg.idc:53060/order-webservice/rest/',
        'smsUrl': 'http://api.accessyou.com/sms/sendsms-utf8.php?pwd=45644429&accountno=11008487'
    },
    'redisStoreOptions': {
        'host': '192.168.11.64',
        'port': 6379,
        'db': 2,
        'ttl': 1800
    },
    'amqpConnectOptions': {
        'host': 'rabbitmq.tg.idc',
        'port': 5672,
        'login': 'tg.package',
        'password': '6X%jNysgdb',
        'vhost': 'tg.production'
    }
};

module.exports = cfg;