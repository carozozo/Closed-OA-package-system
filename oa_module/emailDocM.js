tm.emailDoc = (function () {
    tg.emitter.on('initOnStart', function () {
        tl.msgType.addMsgMainType([
            typeCommonEmail
        ]);
    });
    var self = {};
    var typeCommonEmail = 'commonEmail';
// _server_root/public/templates/email_doc
    var templateDirFull = tl.files.normalizePath(tg.tplDirFull, '/email_doc/');

    self.sendEmailCbC = function (opt, cb) {
        (function coverOptForMailer() {
            opt.to = opt.emailTo || opt.to;
            opt.cc = opt.emailCc || opt.cc;
            opt.bcc = opt.emailBcc || opt.bcc;
            opt.subject = opt.emailSubject || opt.subject;
            opt.text = opt.emailTextContent || opt.text;
            opt.html = opt.emailHtmlContent || opt.html;
        })();
        tl.mailer.sendMailCb(opt, function (err, response) {
            (function storeDb() {
                if (opt.storeDb === false) {
                    return;
                }
                var recordOpt = {
                    mainType: opt.mainType || typeCommonEmail,
                    subType: opt.subType || '',
                    msgTo: opt.to,
                    subject: opt.subject,
                    content: (opt.text || opt.html)
                };
                if (err) {
                    recordOpt.status = 'error';
                }
                tm.pkgMsgRecord.createPkgMsgRecordC(recordOpt);
            })();
            var ret = tl.systemMsg.extendRetObj({}, err, response);
            cb && cb(ret);
        });
    };
    self.getEmailTemplateCbrC = function (name, model, cb) {
        name = tl.string.addTail(name, '.html');
        var emailPath = tl.files.normalizePath(templateDirFull, name);
        var emailHtml = tl.template.getHtmlCbr(emailPath, 'empty', model, function (err, emailHtml) {
            var ret = tl.systemMsg.extendRetObj({}, err, emailHtml);
            cb && cb(ret);
        });
        return tl.systemMsg.extendRetObj({}, null, emailHtml);
    };
    return self;
})();