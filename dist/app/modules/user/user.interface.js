"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAgent = exports.IsActive = exports.ROLE = void 0;
var ROLE;
(function (ROLE) {
    ROLE["ADMIN"] = "ADMIN";
    ROLE["USER"] = "USER";
    ROLE["AGENT"] = "AGENT";
})(ROLE || (exports.ROLE = ROLE = {}));
var IsActive;
(function (IsActive) {
    IsActive["ACTIVE"] = "ACTIVE";
    IsActive["INACTIVE"] = "INACTIVE";
    IsActive["BLOCKED"] = "BLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
var IsAgent;
(function (IsAgent) {
    IsAgent["Pending"] = "pending";
    IsAgent["Approved"] = "approved";
    IsAgent["Suspended"] = "suspended";
})(IsAgent || (exports.IsAgent = IsAgent = {}));
