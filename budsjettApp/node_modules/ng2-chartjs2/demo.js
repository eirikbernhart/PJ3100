"use strict";
var core_1 = require('@angular/core');
var index_1 = require('./index');
var AppComponent = (function () {
    function AppComponent() {
        this.labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
        this.data = [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            console.log('Updating data');
            _this.data[0].data = [26, 15, 2, 36, 18, 7];
        }, 3000);
    };
    AppComponent.prototype.onClick = function (e) {
        console.log('Clicked', e);
    };
    AppComponent.prototype.onResize = function (e) {
        console.log('Resized', e);
    };
    AppComponent.prototype.onHover = function (e) {
        console.log('Hover', e);
    };
    AppComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'my-app',
                    template: '<chart [labels]="labels" [data]="data" type="bar" (onClick)="onClick($event)" (onResize)="onResize($event)" (onHover)="onHover($event)"></chart>'
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = [];
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var core_2 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: core_2.NgModule, args: [{
                    imports: [
                        platform_browser_1.BrowserModule,
                        index_1.ChartModule
                    ],
                    declarations: [
                        AppComponent
                    ],
                    bootstrap: [AppComponent]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [];
    return AppModule;
}());
exports.AppModule = AppModule;
var platform = platform_browser_dynamic_1.platformBrowserDynamic();
platform.bootstrapModule(AppModule);
//# sourceMappingURL=demo.js.map