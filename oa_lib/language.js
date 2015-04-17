/**
 * basic oa-language library
 * @author Caro.Huang
 */
tl.language = (function () {
    var self = {};
    var changeLocality = function (locality) {
        locality = tl.string.lowerStr(locality);
        switch (locality) {
            case 'zh_hk':
                locality = 'hk';
                break;
            case 'zh_cn':
                locality = 'cn';
                break;
            default:
                break;
        }
        return locality;
    };
    /**
     * cover locality key( zh_HK -> hk, zh_CN -> cn ), for support OA-Language-Rule
     * @param oLocality
     * @returns {*}
     */
    self.coverLocality = function (oLocality) {
        var obj = {};
        tl.object.eachObj(oLocality, function (locality, val) {
            locality = changeLocality(locality);
            obj[locality] = val;
        });
        return obj;
    };
    self.getLangByLocaleId = function (oLocality, localeId) {
        if (tl.helper.isEmptyVal(oLocality)) {
            return '';
        }
        if (!tl.helper.isStr(localeId)) {
            localeId = 'en';
        }
        var obj = self.coverLocality(oLocality);
        localeId = localeId.toLowerCase();
        var lang = '';
        switch (localeId) {
            case "hk":
            case "tw":
            case "mo":
            case 'zh_hk':
            case 'zh_tw':
                lang = obj.hk || lang;
                break;
            case "cn":
            case 'zh_cn':
                lang = obj.cn || lang;
                break;
            default :
                lang = obj.en || lang;
                break;
        }
        return lang;
    };
    return self;
})();