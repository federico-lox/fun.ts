/// <reference path="type.ts" />
/// <reference path="func.ts" />
/// <reference path="iterator.ts" />

declare var module;
declare var require;

if (module && module.exports && typeof require === 'function') {
    module.exports = fun;
}