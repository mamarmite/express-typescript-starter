import App from "@/Express/App";
import config from "@Server/Configs/defaults";
import express from "express";

export default class MainApp extends App{

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
    }

    private _setupRoutes() {
        console.log("setup routes");
        this.mainRouter.get("/", async (req, res) => {
            res.send(`Serving on ${config.port}`);
        });
    }

}