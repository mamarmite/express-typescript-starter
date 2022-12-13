import express from "express";

export default class PublicRoutes {

    public router:express.Router;
    public baseUri: string;

    constructor(baseUri:string) {
        this.router = express.Router();
        this.baseUri = baseUri;
    }

    public init():express.Router {
        return this.router;
    }

}