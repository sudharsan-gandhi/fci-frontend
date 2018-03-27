import { element } from 'protractor';
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators/map';
import { FunctionCall } from '@angular/compiler';

declare var require: any;
const PouchDB = require('pouchdb').default;
const CouchDb = 'http://localhost:8000/';

@Injectable()
export class PouchDbService implements OnInit {
    private isInstantiated: boolean;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();
    private remoteCouch = 'http://localhost:5984/fci';
    private datas = [];
    private syncFlag = true;

    ngOnInit() {

    }
    constructor(private http: Http) {
        if (!this.isInstantiated) {
            this.database = new PouchDB('fci');
            this.isInstantiated = true;
            console.log('offline db created and current adapter used is:', this.database.adapter);
        }
        this.database.changes({
            since: 'now',
            live: true,
            include_docs: true
        }).on('change', function () {
            this.startSync();
        }).on('error', function () {
            this.stopSync();
        });
        document.addEventListener('online', this.startSync);
        document.addEventListener('offline', this.stopSync);
    }
    public fetch() {
        return this.database.allDocs({ include_docs: true, descending: true });
    }
    public startSync() {
        console.log('you are online');
        this.datas = this.fetch();
        console.log(this.datas);
        this.syncOneByOne();
    }
    public stopSync() {
        console.log('you are offline');
        this.syncFlag = false;
    }

    public get(id: string) {
        return this.database.get(id);
    }

    public put(id: string, document: any) {
        document._id = id;
        return this.get(id).then(result => {
            document._rev = result._rev;
            return this.database.put(document);
        }, error => {
            if (error.status === '404') {
                return this.database.put(document);
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    public push(document: any) {
        document._id = '' + new Date().getTime();
        return this.database.put(document).then(doc => {
            console.log('push doc', doc);
        }).catch(err => {
            console.log('error in pushing', err);
        });
    }
    public delete(id: string) {
        this.database.get(id).then(function (doc) {
            return this.database.remove(doc);
        });
    }

    //   public deleteAll() {
    //       this.fetch().then(data => {
    //         data.rows.forEach(element => {
    //             this.delete(element.id);
    //             console.log('deleted');
    //         });
    //       }).catch(err => {

    //       })
    //   }

    // public sync(remote: string) {
    //     let remoteDatabase = new PouchDB(remote);
    //     this.database.sync(remoteDatabase, {
    //         live: true
    //     }).on('change', change => {
    //         this.listener.emit(change);
    //     }).on('error', error => {
    //         console.error(JSON.stringify(error));
    //     });
    // }

    public getDatabase() {
        return this.database;
    }

    public replicate() {
        PouchDB.replicate('fcitest', this.remoteCouch, { live: true });
    }


    public sync() {
        const opts = { live: true };
        this.database.sync(this.remoteCouch, opts);
    }

    public info() {
        return this.database.info();
    }

    // public sync(remote: string) {
    //     let remoteDatabase = new PouchDB(remote);
    //     this.database.sync(remoteDatabase, {
    //         live: true
    //     }).on('change', change => {
    //         this.listener.emit(change);
    //     }).on('error', error => {
    //         console.error(JSON.stringify(error));
    //     });
    // }

    public getChangeListener() {
        return this.listener;
    }
    //////////////////////////////////////// user code/////////////////////////////////////////////////
    // user signup
    public userSignup(user) {
        user.type = 'user';
        const url = CouchDb + 'signup';
        return this.http.post(url, user);
    }

    public login(user) {
        const url = CouchDb + 'login';
        return this.http.post(url, user);

    }

    async syncOneByOne() {
        const url = CouchDb + 'sync';
        for (const data of this.datas) {
            if (this.syncFlag) {
                await this.http.post(url, data).subscribe((response) => {
                    console.log(response);
                });
            } else {
                break;
            }
        }
    }

    // ///////////////////////////////////////end user code//////////////////////////////////////////////
}

