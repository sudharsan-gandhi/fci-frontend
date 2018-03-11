import { Injectable, EventEmitter } from '@angular/core';
declare var require: any;
const PouchDB = require('pouchdb').default;

@Injectable()
export class PouchDbService {
    private isInstantiated: boolean;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();
    private remoteCouch = "http://localhost:5984/fcitest";
    constructor() {
        if (!this.isInstantiated) {
            this.database = new PouchDB('fcitest');
            this.isInstantiated = true;
            console.log('offline db created and current adapter used is:', this.database.adapter);
        }
    }
    public fetch() {
        return this.database.allDocs({ include_docs: true, descending: true });
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
        document._id = ""+new Date().getTime();
        return this.database.put(document).then(doc => {
            console.log("push doc", doc);
        }).catch(err => {
            console.log("error in pushing ",err);
        });
    }

    public delete(id: string) {
        this.database.get(id).then(function (doc) {
            return this.database.remove(doc);
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
    public getChangeListener() {
        return this.listener;
    }

    public getDatabase() {
        return this.database;
    }

    public replicate() {
        PouchDB.replicate('fcitest', this.remoteCouch, { live: true });
    }


    public sync() {

        this.database.sync(this.remoteCouch, opts);
        var opts = { live: true };
    }

    public info() {
        return this.database.info();
    }

}