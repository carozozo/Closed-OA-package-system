/**
 * language about email
 * please refer to
 * https://github.com/andris9/Nodemailer/blob/0.7/README.md
 * @author Caro.Huang
 */
tl.mailer = (function () {
    var self = {};
    var mailerCfg = null;

    /**
     * OPT -
     * from - The e-mail address of the sender. All e-mail addresses can be plain sender@server.com or formatted Sender Name <sender@server.com>
     * to - Comma separated list or an array of recipients e-mail addresses that will appear on the To: field
     * cc - Comma separated list or an array of recipients e-mail addresses that will appear on the Cc: field
     * bcc - Comma separated list or an array of recipients e-mail addresses that will appear on the Bcc: field
     * replyTo - An e-mail address that will appear on the Reply-To: field
     * inReplyTo - The message-id this message is replying
     * references - Message-id list
     * subject - The subject of the e-mail
     * text - The plaintext version of the message
     * html - The HTML version of the message
     * generateTextFromHTML - if set to true uses HTML to generate plain text body part from the HTML if the text is not defined
     * headers - An object of additional header fields {"X-Key-Name": "key value"} (NB! values are passed as is, you should do your own encoding to 7bit and folding if needed)
     * attachments - An array of attachment objects.
     * alternatives - An array of alternative text contents (in addition to text and html parts)
     * envelope - optional SMTP envelope, if auto generated envelope is not suitable
     * messageId - optional Message-Id value, random value will be generated if not set. Set to false to omit the Message-Id header
     * date - optional Date value, current UTC string will be used if not set
     * encoding - optional transfer encoding for the textual parts (defaults to "quoted-printable")
     * charset - optional output character set for the textual parts (defaults to "utf-8")
     * dsn - An object with methods success, failure and delay. If any of these are set to true, DSN will be used
     *
     * Attachments Example -
     * attachments: [
     * {   // utf-8 string as an attachment
 *      fileName: "text1.txt",
 *     contents: "hello world!"
 * },
     * {   // binary buffer as an attachment
 *     fileName: "text2.txt",
 *     contents: new Buffer("hello world!","utf-8")
 * },
     * {   // file on disk as an attachment
 *     fileName: "text3.txt",
 *     filePath: "/path/to/file.txt" // stream this file
 * },
     * {   // fileName and content type is derived from filePath
 *     filePath: "/path/to/file.txt"
 * },
     * {   // stream as an attachment
 *     fileName: "text4.txt",
 *     streamSource: fs.createReadStream("file.txt")
 * },
     * {   // define custom content type for the attachment
 *     fileName: "text.bin",
 *     contents: "hello world!",
 *     contentType: "text/plain"
 * },
     * {   // use URL as an attachment
 *     fileName: "license.txt",
 *     filePath: "https://raw.github.com/andris9/Nodemailer/master/LICENSE"
 * }
     * ]
     * @param mailOpt
     * @param cb
     */
    self.sendMailCb = function (mailOpt, cb) {
        mailerCfg = mailerCfg || tcfg.mailer;
        var logErr = function (msg) {
            tl.console.logErr('tl.mailer.sendMailCb', {
                msg: msg,
                mailOpt: mailOpt
            });
        };
        if (!mailOpt) {
            logErr('missing mail options');
            cb('Send mail err: Missing mail options');
            return;
        }
        if (!mailOpt.to) {
            logErr('missing mail target');
            cb('Send mail err: Target-email is empty');
            return;
        }
        if (!mailOpt.subject) {
            logErr('missing mail subject');
            cb('Send mail err: Subject is empty');
            return;
        }
        if (!mailOpt.text && !mailOpt.html) {
            logErr('missing mail content');
            cb('Send mail err: Content is empty');
            return;
        }

        // https://www.npmjs.org/package/nodemailer
        var nodemailer = require('nodemailer');
        var smtpTransport = nodemailer.createTransport('SMTP', mailerCfg.transportOptions);
        var defMailOpt = {
            from: mailerCfg.mailOptions.from,
            replyTo: mailerCfg.mailOptions.replyTo
        };
        mailOpt = tl.object.extendObj(defMailOpt, mailOpt);
        smtpTransport.sendMail(mailOpt, function (err, response) {
            if (err) {
                logErr(err);
            }
            cb && cb(err, response);
            smtpTransport.close();
        });
    };
    return self;
})();