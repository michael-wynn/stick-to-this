/* This work is distributed under MIT license, and is utilizes modified codes
from another work here:  https://github.com/btford/fn-params
* */
'use strict';
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var bodyTemplate = ' var {alias} = this; return function ({args}){body};\n';

function getFunctionParams (fn) {
    var fnText = fn.toString().replace(STRIP_COMMENTS, '');
    return fnText.split(FN_ARGS);
}

function stick(This, fn, alias){
    var context = This;
    var fnParts = getFunctionParams(fn);
    var fnBody = fnParts[2];
    var fnArgs = fnParts[1]? fnParts[1].split(',') : [];
    var proxyBody = bodyTemplate
        .replace('{args}', fnArgs.join(','))
        .replace('{body}', fnBody)
        .replace('{alias}', alias || '_this');
    fnArgs.push(proxyBody);
    var proxyMaker = Function.apply(null, fnArgs).bind(context);
    return proxyMaker();
}

module.exports = stick;
