import { OnInit } from '@angular/core';
import { Chart } from './index';
export declare class AppComponent implements OnInit {
    labels: string[];
    data: Chart.Dataset[];
    ngOnInit(): void;
    onClick(e: any): void;
    onResize(e: any): void;
    onHover(e: any): void;
}
export declare class AppModule {
}
