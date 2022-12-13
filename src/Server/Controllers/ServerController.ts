import * as http from "http";
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import config from "@/Server/Configs/defaults";
import ExpressProvider from "@/Express/Providers/ExpressProvider";

/**
 * Manage all the serveur actions and connect the app to the ROUTE.
 */
export default class ServerController {

    public server: http.Server;
    public appProvider: ExpressProvider;

    static _singleton:ServerController;

    /**
     * Create an instance of ServerController with the express app.
     * @param provider {ExpressProvider}
     */
    constructor(provider:ExpressProvider)
    {
        this.server = http.createServer();
        this.appProvider = provider;
    }

    /**
     * Singleton of this, ServerController, to keep this running as only one instance.
     * @param provider ExpressProvider For now, will add abstraction after.
     */
    static getInstance(provider:ExpressProvider)
    {
        if (ServerController._singleton === undefined) {
            ServerController._singleton = new ServerController(provider);
        }
        return ServerController._singleton;
    }


    /**
     * Create an HTTP server from node.http, listence on error and on config.port.
     * Connect to the database
     */
    public async start()
    {
        this.server = http.createServer(this.appProvider.serve());

        this.server.on("error", this.onError);
        this.server.on("listening", this.onListening);

        this.appProvider.start();

        this.server.listen(config.port);
    }

    /**
     * When the API got and error. Will exit and
     * @param error
     */
    public onError(error: any)
    {
        if (error.syscall !== "listen")
        {
            throw error;
        }

        const bind = `Port ${config.port} `;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                this.exitApi(StatusCodes.FORBIDDEN, bind + ReasonPhrases.FORBIDDEN);
                break;

            case "EADDRINUSE":
                this.exitApi(StatusCodes.INTERNAL_SERVER_ERROR, bind + "is already in use" + ReasonPhrases.INTERNAL_SERVER_ERROR);
                break;

            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" on target port.
     * port is setup in the .env file.
     */
    public onListening()
    {
        console.log(`Server listening on port: ${config.port}`);
    }

    /**
     * Method to concentrate the process of exiting the API, to control the steps in one place.
     * @param errorCode
     * @param message
     */
    public exitApi(errorCode:any, message:string)
    {
        process.exit(errorCode);
    }
}
