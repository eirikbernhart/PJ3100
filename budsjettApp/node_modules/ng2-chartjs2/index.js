"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var chart_1 = require('./components/chart');
__export(require('./components/chart'));
var ChartModule = (function () {
    function ChartModule() {
    }
    ChartModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        chart_1.ChartComponent
                    ],
                    exports: [
                        chart_1.ChartComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    ChartModule.ctorParameters = [];
    return ChartModule;
}());
exports.ChartModule = ChartModule;
//# sourceMappingURL=index.js.map