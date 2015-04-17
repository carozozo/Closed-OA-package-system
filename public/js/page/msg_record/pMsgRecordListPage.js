$.fn.pMsgRecordListPage = function (pageOpt) {
    var self = this;
    var dMsgRecordListFn = function () {
        var dMsgRecordList = self.find('#msgRecordList');
        var oMsgRecordList = null;
        $.ajax.pkgMsgRecord.getPkgMsgRecordListAJ(pageOpt, function (res) {
            $.lAjax.parseRes(res, function (result) {
                oMsgRecordList = $.lObj.cloneObj(result);
            });
        });
        $.lConsole.log('oMsgRecordList=', oMsgRecordList);
        if (!oMsgRecordList) {
            return dMsgRecordList;
        }
        dMsgRecordList.dMsgRecordListTable = (function () {
            var oaMsgRecord = oMsgRecordList.results;
            var dMsgRecordListTable = dMsgRecordList.find('#msgRecordListTable');
            dMsgRecordListTable.mListTable(oaMsgRecord, function (oMsgRecord) {
                return $.tMod.msgRecord(oMsgRecord);
            }, function (i, oMsgRecord, dEachDom) {
                (function setIndex() {
                    var dIndex = dEachDom.find('.index');
                    dIndex.html((pageOpt.startPage * pageOpt.pageSize) + i + 1);
                })();
                (function setContent() {
                    var dContent = dEachDom.find('.content');
                    dContent.mTextShorter();
                })();
            });
            return dMsgRecordListTable;
        })();
        (function dPagination() {
            var dPagination = dMsgRecordList.find('#pagination');
            var startPage = oMsgRecordList.currentPageNumber;
            var pageSize = oMsgRecordList.pageSize;
            var totalCount = oMsgRecordList.totalCount;
            var totalPage = oMsgRecordList.totalPages;
            var opt = {
                startPage: startPage,
                pageSize: pageSize,
                totalCount: totalCount,
                totalPage: totalPage,
                clickFn: function (page, pageSize) {
                    pageOpt.startPage = page;
//                    pageOpt.pageSize = pageSize;
                    $.lPage.setPageSize($.pMsgRecord.msgRecordListPath, pageSize);
                    dMsgRecordListFn();
                }
            };
            dPagination.mPagination(opt);
            return dPagination;
        })();
        return dMsgRecordList;
    };
    var dSearch = (function () {
        var dSearch = self.find('#search');
        var searchFn = function () {
            pageOpt.startPage = 0;
            var mSearch = $.lForm.coverToModel(dSearch);
            var mFullSearch = $.lForm.coverToModel(dFullSearch);
            $.extend(pageOpt, mSearch, mFullSearch);
            dMsgRecordListFn();
        };
        (function dMainType() {
            var dMainType = dSearch.find('#mainType');
            var aMainType = [];
            $.ajax.pkgMsgRecord.getPkgMsgMainTypeListAJ(function (res) {
                $.lAjax.parseRes(res, function (result) {
                    $.each(result, function (i, mainType) {
                        aMainType.push({
                            val: mainType,
                            name: mainType
                        });
                    });
                });
            });
            return dMainType.mSelect(aMainType, {
                zeroOption: true
            });
        })();
        (function dSubType() {
            var dSubType = dSearch.find('#subType');
            var aSubType = [];
            $.ajax.pkgMsgRecord.getPkgMsgSubTypeListAJ(function (res) {
                $.lAjax.parseRes(res, function (result) {
                    $.each(result, function (i, subType) {
                        aSubType.push({
                            val: subType,
                            name: subType
                        });
                    });
                });
            });
            return dSubType.mSelect(aSubType, {
                zeroOption: true
            });
        })();
        dSearch.dSearchSpan1 = (function () {
            var dSearchSpan1 = dSearch.find('#searchSpan1');
            return dSearchSpan1;
        })();
        dSearch.dSearchSpan2 = (function () {
            var dSearchSpan2 = dSearch.find('#searchSpan2');
            return dSearchSpan2;
        })();
        dSearch.dSearchBtnSpan = (function dSearchBtnSpanFn() {
            var dSearchBtnSpan = dSearch.find('#searchBtnSpan');
            (function dSearchBtn() {
                var dSearchBtn = dSearchBtnSpan.find('#searchBtn');
                dSearchBtn.mBtn('search', function () {
                    searchFn();
                });
                return dSearchBtn;
            })();
            (function dResetBtn() {
                var dResetBtn = dSearch.find('#resetBtn');
                dResetBtn.mBtn('clean', function () {
                    $.lForm.clean(dSearch);
                    $.lForm.clean(dFullSearch);
                });
                return dResetBtn;
            })();
            return dSearchBtnSpan;
        })();
        $.lModel.mapDom(pageOpt, dSearch);
        return dSearch;
    })();
    var dFullSearch = (function () {
        var dFullSearch = self.find('#fullSearch');
        (function dStatus() {
            var dStatus = dFullSearch.find('#status');
            var aStatus = [];
            $.ajax.pkgMsgRecord.getPkgMsgStatusListAJ(function (res) {
                $.lAjax.parseRes(res, function (result) {
                    $.each(result, function (i, status) {
                        aStatus.push({
                            val: status,
                            name: status
                        });
                    });
                });
            });
            return dStatus.mSelect(aStatus, {
                zeroOption: true
            });
        })();
        dFullSearch.dFullSearchSpan1 = (function () {
            var dFullSearchSpan1 = dFullSearch.find('#fullSearchSpan1');
            return dFullSearchSpan1;
        })();
        dFullSearch.dFullSearchSpan2 = (function () {
            var dFullSearchSpan2 = dFullSearch.find('#fullSearchSpan2');
            return dFullSearchSpan2;
        })();
        dFullSearch.dFullSearchBtnSpan = (function () {
            var dFullSearchBtnSpan = dFullSearch.find('#fullSearchBtnSpan');
            return dFullSearchBtnSpan;
        })();
        return dFullSearch;
    })();
    var dMsgSender = (function () {
        var dMsgSender = self.find('#msgSender');
        return dMsgSender.hide();
    })();
    var dMsgRecordList = dMsgRecordListFn();
    (function dSendMsgBtn() {
        var dSendMsgBtn = self.find('#sendMsgBtn');
        dSendMsgBtn.mBtn('create', function () {
            dMsgSender.pMsgSender();
            dMsgSender.showMsgSender();
        });
        return dSendMsgBtn;
    })();
    (function dSearchLink() {
        var dSearchLink = self.find('#searchLink');
        dSearchLink.mCollapser(dFullSearch, {
            append: 'before',
            appendTarget: dMsgRecordList.dMsgRecordListTable,
            beforeShow: function () {
                dSearch.dSearchSpan1.children().appendTo(dFullSearch.dFullSearchSpan1);
                dSearch.dSearchSpan2.children().appendTo(dFullSearch.dFullSearchSpan2);
                dSearch.dSearchBtnSpan.children().appendTo(dFullSearch.dFullSearchBtnSpan);
            },
            afterHide: function () {
                dFullSearch.dFullSearchSpan1.children().appendTo(dSearch.dSearchSpan1).hide().fadeIn();
                dFullSearch.dFullSearchSpan2.children().appendTo(dSearch.dSearchSpan2).hide().fadeIn();
                dFullSearch.dFullSearchBtnSpan.children().appendTo(dSearch.dSearchBtnSpan).hide().fadeIn();
            }
        });
        return dSearchLink;
    })();
    return self;
};