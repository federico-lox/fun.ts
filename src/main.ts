/// <reference path="type.ts" />
/// <reference path="function.ts" />
/// <reference path="collection.ts" />
/// <reference path="dictionary.ts" />
/// <reference path="list.ts" />
/// <reference path="sequence.ts" />

declare var module;
declare var require;

if (typeof module !== 'undefined' && module.exports != undefined && typeof require !== 'undefined' && require.constructor === Function) {
    module.exports = fun;
}