import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import { dbOptions } from "./config/db";
import uuid from "uuid/v4";
import "./config/passport";
import passport from "passport";
import routes from "./routes";
const MySQLStore = require('express-mysql-session')(session);

class App {
    private app: express.Application;

    constructor() {
        this.app = express()

        this.connectDb()
        this.setup()
        this.setupSession()
        this.setupPassport();
        
        this.app.use('/', routes)
    }

    private async connectDb() {
        try {
            
            await createConnection()
            console.log("✔️ Connected to DB")

        } catch(err) {
           
            console.log("🛑 Unable to connect to DB")
            console.error(err)
        
        }
    }

    private setup(): void {
        this.app.use(cors({
            origin:['http://localhost:4200','http://127.0.0.1:4200'],
            credentials:true
          }));
        this.app.use(bodyParser.json());
        // application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: true }))
    }

    private setupSession(): void {
        const sessionStore = new MySQLStore(dbOptions)
        
        this.app.use(session({
            genid: (req) => {
                return uuid();
            }, 
            secret: 'greenlinessuck',
            store: sessionStore,
            resave: false,
            saveUninitialized: true
        }));
        console.log("✔️ Initialized session store")
    }

    private setupPassport(): void {
        this.app.use(passport.initialize())
        this.app.use(passport.session())
        console.log("✔️ Initialized passport")
    }

    public getApp(): express.Application {
        return this.app
    }
    
}

export default App