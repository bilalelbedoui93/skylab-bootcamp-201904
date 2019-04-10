'use strict'
/**
 * keeps secret safe from any scope where its run
 * 
 *@param {string} the accessing password.
 *@param {*}
 *@param {string}
 *
- location staff/<name>/safe-box
- USER STORY

```
// acceptance criterial

// 1

safeBox('123', 'my secret'); 
// returns true - if password is correct, indicating secret is saved and safe
// throw Error('wrong password') - if password is wrong

// 2

var secret = safeBox('123');
// returns secret === 'my secret' - If password is correct
// throw Error('wrong password') - if password is wrong

// 3

safeBox('123', '456', true);
// returns true - Indicating the password has successfully been changed
// throw Error('wrong password') - if password is wrong

```
 * 
 */

function safeBox(password,secretOrNewPass,changePass){


}