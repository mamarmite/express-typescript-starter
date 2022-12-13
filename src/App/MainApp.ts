import App from "@/Express/App";
import config from "@Server/Configs/defaults";
import express, {NextFunction, Request, Response} from "express";
import {RouteErrorMiddleware} from "@express/Middlewares/RouteErrorMiddleware";
import {StatusCodes} from "http-status-codes";

export default class MainApp extends App {

    public mainRouter:express.Router;

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
    }

    private _setupRoutes() {
        this.mainRouter.get("/", this.renderResponseHandler.bind(this));
    }

    public async defaultEndpointHandler(req: Request, res: Response, next: NextFunction) {
        return next();
    }

    public async renderResponseHandler(req: Request, res: Response): Promise<any> {
        return res.status(StatusCodes.OK).send("OK");
    }

}