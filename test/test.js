/**
 * Created on 9/19/15. Copyright Michael Wynn - all rights reserved.
 */
'use strict';
var stick = require('../index');
var assert = require('assert');

describe('Stick function proxy', function(){

    it('Function with params', function(){
        var v = {value: 200};
        var f = function (a,b,c){
            return _this.value + a + b + c; /* _this to be defined via  */
        }
        var proxy = stick(v, f);
        var a = 1, b = 2, c = 3;
        assert(proxy(a, b, c) === v.value + a + b +c);
    })

    it('Function without params', function(){
        var v = {value: 15};
        var fn = function (){
            return _this.value * 2; /* _this to be defined via  */
        }
        var proxy = stick(v, fn);
        assert(proxy() === v.value * 2);
    })

})


