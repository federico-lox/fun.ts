/// <reference path="func.ts" />

declare var module;
declare var require;

if (module && module.exports && typeof require === 'function') {
    module.exports = fun;
}