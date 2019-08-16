import {Request, Response} from "express";

import App from "./app";

const app = new App().getApp();
const PORT = 3000;

app.get('/', (req: Request, res: Response)=> {
    res.json(`{ message: 200 , sessionID: ${req.sessionID}}`);
    
})

app.listen(PORT, () => {
    console.log('Express server listening on port '  + PORT);
} )