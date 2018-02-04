import {Http } from '@angular/http';
import { Router } from '@angular/router'
import { Injectable } from '@angular/core';
//import { configuration as conf } from '../../../../environments/.env';

@Injectable()
export class DtableService {

    rows: Array<any>=[];
    columns: any;
    offset: number = 0;
    limit: number = 10;
    count: number = 0;
    theFirstTime: boolean = true;
    httpResouce: string;
    route: string;
    filter:string;
    excludedColumns: Array<string>=['id'];

    constructor(private http: Http,
                private router: Router) {
    }

    config(config: DtableConf){
        if(config.columns) this.setColumns(config.columns);
        if(config.offset) this.setOffset(config.offset);
        if(config.limit) this.setLimit(config.limit);
        if(config.filter) this.setFilter(config.filter);
        if(config.route) this.setRoute(config.route);
        if(config.httpResouce) this.sethttpResouce(config.httpResouce);
        if(config.excludedColumns) this.excludeColumns(config.excludedColumns);
    }
    sethttpResouce(httpResouce){
        this.httpResouce= httpResouce;
    }

    setColumns(columns){
        this.columns= columns;
    }

    setRoute(route){
        this.route= route;
    }

    excludeColumns(columns){
        this.excludedColumns.concat(columns);
    }

    setFilter(filter){
        this.filter= filter;
    }

    setOffset(offset){
        this.offset= offset;
    }

    setLimit(limit){
        this.limit= limit;
    }

    page(offset, limit) {

        // this.http.get(conf.API_BASE_URL+'/'+this.httpResouce+
        //     (this.filter ? '?filter'+this.filter+'&' :'')+
        //     '?filter[limit]='+limit+'&filter[skip]='+offset).subscribe(res=>{
        //     const start = offset * limit;
        //     const res_rows = [...this.rows];
        //     let results : Array<any> = res.json();

        //     for (let i = start,j = 0; j < results.length; i++, j++) {
        //         res_rows[i] = results[j];
        //     }

        //     this.rows = res_rows;
        //     if(!this.columns){
        //         if(this.theFirstTime && results[0]){
        //             this.columns= Object.keys(results[0]).
        //             filter(val => {
        //                 return ["number","string","boolean"].
        //                     indexOf(typeof results[0][val]) !== -1 && this.excludedColumns.indexOf(val) == -1;
        //             }).
        //             map( val => {
        //                 return { name: val };
        //             });
        //             this.theFirstTime = false;
        //         }
        //     }

        // })
    }

    onPage(event) {
        this.page(event.offset, event.limit);
    }

    onSelect({selected}){
        this.router.navigate(['/'+this.route, selected[0].id]);
    }

    getCountFromServer(){
        // return this.http.get(conf.API_BASE_URL+'/'+this.httpResouce+'/count'+(this.filter ? '?'+this.filter : '')).toPromise().then(res=>{
        //     return new Promise((resolve,reject)=>{
        //         this.count= res.json().count;
        //         resolve()
        //     });
        // })
    }

    initialize(){
        // this.getCountFromServer().then(()=>{
        //     this.page(this.offset,this.limit);
        // });

    }
}

export interface DtableConf{
    columns?: any;
    offset?: number;
    limit?: number;
    filter?: string;
    count?: number;
    httpResouce: string;
    route: string;
    excludedColumns?: Array<string>;
}