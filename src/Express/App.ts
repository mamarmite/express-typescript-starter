import express from "express";
import AppContract from "@/Express/Contracts/AppContract";
import ExpressProvider from "@/Express/Providers/ExpressProvider";

export default abstract class App implements AppContract {

    public express: express.Application = express();
    public provider: ExpressProvider;

    constructor() {
        this.provider = new ExpressProvider(this);
    }

    abstract start():void;

    public provide():ExpressProvider {
        return this.provider;
    }
}