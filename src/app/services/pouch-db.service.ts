import { element } from 'protractor';
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators/map';
import { FunctionCall } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

declare var require: any;
const PouchDB = require('pouchdb').default;
const CouchDb = 'http://localhost:8000/';

@Injectable()
export class PouchDbService implements OnInit {
    private isInstantiated: boolean;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();
    private remoteCouch = 'http://localhost:5984/fci';
    private datas: any;
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
        }).on('change', function (change) {
            console.log('change in cons', change);
        }).on('complete', function (info) {
            console.log('change', info);
        }).on('error', function (err) {
            console.log(err);
        });
        window.addEventListener('online', () => { this.startSync(); });
        window.addEventListener('offline', () => { this.stopSync(); });
    }
    public changes() {
        this.database.changes({
            since: 'now',
            live: true,
            include_docs: true
        }).on('change', function (change) {
            console.log('change', change);
        }).on('complete', function (info) {
            console.log('change', info);
        }).on('error', function (err) {
            console.log(err);
        });
    }
    public fetch() {
        console.log('inside fetch');
        return this.database.allDocs({ include_docs: true, descending: true });
    }
    public startSync() {
        this.syncFlag = true;
        console.log('you are online');
        this.fetch().then(data => {
            this.datas = data;
            console.log('start sync ', this.datas);
            this.syncOneByOne();
        }).catch(err => {
            console.log('error', err);
        });
    }
    public stopSync() {
        console.log('you are offline');
        this.syncFlag = false;
    }

    public get(id: number) {
        return this.database.get(id);
    }

    public put(id: number, document: any) {
        document._id = id;
        document.timestamp = '' + new Date().getTime();
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
        document.timestamp = '' + new Date().getTime();
        return this.database.put(document).then(doc => {
            console.log('push doc', doc);
        }).catch(err => {
            console.log('error in pushing', err);
        });
    }
    public deleteById(id: number) {
        this.database.get(id).then(function (doc) {
            return this.database.remove(doc);
        });
    }

    public deleteByDoc(doc: any) {
        return this.database.remove(doc);
    }
    public deleteAll() {
        this.fetch().then(data => {
            data.rows.forEach(datum => {
                this.deleteByDoc(datum.doc).then(success => {
                    console.log('success', success);
                }).catch(err => {
                    console.log('error', err);
                });
                console.log('deleted');
            });
        }).catch(err => {

        });
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

    syncOneByOne() {
        const url = CouchDb + 'sync';
        console.log('datas', this.datas);
        console.log('syn one by one', url);
        this.datas.rows.forEach(data => {
            console.log('sync one data', data.doc);
            if (this.syncFlag) {
                // const headers = new Headers({ 'Content-Type': 'application/json' });
                // const options = new RequestOptions({ headers: headers });
                // data.doc._rev = null;
                delete data.doc._rev;
                console.log('stringify ', data.doc);
                this.http.post(url, data.doc)
                    .subscribe((response) => {
                        console.log(response);
                    });
                console.log(data);
            } else {
                return;
            }
        });
    }

    // ///////////////////////////////////////end user code//////////////////////////////////////////////
}

