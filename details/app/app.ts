import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import { dbOptions } from "./config/db";
import uuid from "uuid/v4";
import "./config/passport";
import passport from "passport";
import routes from "./routes"
const MySQLStore = require('express-mysql-session')(session);

class App {
    private app: express.Application;

    constructor() {
        this.app = express()

        this.setup()
        this.setupSession()
        this.setupPassport();
        
        this.app.use('/', routes)
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
                console.log("New Session: " + req.sessionID);
                return uuid();
            }, 
            secret: 'greenlinessuck',
            store: sessionStore,
            resave: false,
            saveUninitialized: true
        }));
    }

    private setupPassport(): void {
        this.app.use(passport.initialize())
        this.app.use(passport.session())
    }
    
}