import App from "@/Express/App";
import config from "@Server/Configs/defaults";
import express, {NextFunction, Request, Response} from "express";
import {RouteErrorMiddleware} from "@express/Middlewares/RouteErrorMiddleware";
import {StatusCodes} from "http-status-codes";
import { marked } from 'marked';
import * as fs from "fs";

export default class MainApp extends App {

    public mainRouter:express.Router;
    public markdownBasepath:string = "./content/";


    constructor() {
        super();
        this.mainRouter = express.Router();
    }


    public start() {
        this.express.set("port", config.port);
        this.setup();
    }


    public setup() {
        this._setupRoutes();
        this.express.use(this.mainRouter);
        this.mainRouter.use(RouteErrorMiddleware.get());
        this.mainRouter.use(this.renderResponseHandler.bind(this));
    }


    private _setupRoutes() {
        this.mainRouter.get("/", [
            this.indexHandler.bind(this)
        ]);
        //,
        //             this.loadMarkdownFile.bind(this)
    }


    public async indexHandler(req: Request, res: Response, next: NextFunction) {
        res.filename = "homepage/index";
        return await this.loadMarkdownFile(req, res, next);
    }


    public async loadMarkdownFile(req: Request, res: Response, next: NextFunction) {
        if (res.filename && res.filename !== "") {
            fs.readFile(
                `${this.markdownBasepath}${res.filename}.md`,
                'utf8',
                async (err, data) => {
                    if (err) {
                        // handle the error
                        throw err;
                    }

                    res.rawContent = data;
                    return next();
                }
            );
        }
    }


    public async defaultEndpointHandler(req: Request, res: Response, next: NextFunction) {
        return next();
    }


    public async renderResponseHandler(req: Request, res: Response): Promise<any> {

        const rawMarkdownString:string = res.rawContent ?? "# not loaded from file yet";

        const html:string = marked.parse(rawMarkdownString);
        return res.status(StatusCodes.OK).send(String(html));
    }

}