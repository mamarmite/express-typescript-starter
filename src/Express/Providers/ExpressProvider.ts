import express from "express";
import AppContract from "@/Express/Contracts/AppContract";


export default class ExpressProvider {

    public app: AppContract;
    public express: express.Application;

    constructor(app:AppContract) {
        this.app = app;
        this.express = app.express;
    }

    public serve(): express.Application {
        return this.express;
    }

    public start():void {
        this.app.start();
    }
}