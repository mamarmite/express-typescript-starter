import {NextFunction, Request, Response} from "express";

export class RouteErrorMiddleware {

    public static get()
    {
        /**
         * The RouteErrorMiddleware anonymous function.
         * @param err {Error}
         * @param req {Request}
         * @param res {Response}
         * @param next {NextFunction}
         * @return Promise<Response<any, Record<string, any>> | undefined>
         */
        return async function (err: Error, req: Request, res: Response, next: NextFunction)
        {
            return res.status(500)
                .send("error")
                .end();
        }
    }
}