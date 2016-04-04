/// <reference path="type.ts" />
/// <reference path="func.ts" />
/// <reference path="sequence.ts" />

declare var module;
declare var require;

if (module && module.exports && typeof require === 'function') {
    module.exports = fun;
}