/**
 * The operator with console for easy reading
 * please refer to [https://www.npmjs.org/package/colors]
 * @author Caro.Huang
 */
tl.console = (function () {
    var self = {};
    require('colors');
    var combineMsg = function (msg, variable) {
        if (tl.helper.isObj(msg)) {
            msg = tl.json.safeStringify(msg, null, 2);
        }
        if (variable !== undefined) {
            if (tl.helper.isObj(variable)) {
                variable = tl.json.safeStringify(variable, null, 2);
            }
            msg += variable;
        }
        try {
            return msg.toString();
        } catch (e) {
            return msg;
        }
    };
    var logErr = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if (this.isOdd) {
            console.log(msg.magenta);
            this.isOdd = false;
            return;
        }
        console.log(msg.red);
        this.isOdd = true;
    };

    /**
     * not working on production-server
     * print different console.log color in odd/even line
     * @param msg
     * @param [variable]
     */
    self.log = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if (this.isOdd) {
            console.log(msg.green);
            this.isOdd = false;
            return;
        }
        console.log(msg.cyan);
        this.isOdd = true;
    };
    /**
     * as tgConsole.log with other colors
     * @param msg
     * @param [variable]
     */
    self.log2 = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if (this.isOdd) {
            console.log(msg.blue);
            this.isOdd = false;
            return;
        }
        console.log(msg.yellow);
        this.isOdd = true;
    };
    self.logErr = function (fnName, msg, msg2) {
        var msgArr = [];
        var coverToString = function (arg) {
            if (tl.helper.isObj(arg)) {
                if (arg.message)  return arg.message;
                return tl.json.safeStringify(arg, null, 2);
            }
            if (tl.helper.isStr(arg)) return arg;
            return '';
        };
        fnName += ' error';
        msg = coverToString(msg);
        msg2 = coverToString(msg2);
        tl.array.pushNoEmpty(msgArr, msg);
        tl.array.pushNoEmpty(msgArr, msg2);
        if (!tl.helper.isEmptyVal(msgArr)) {
            fnName += ': ';
        }
        logErr(fnName, msgArr.join(', '));
    };
    return self;
})();