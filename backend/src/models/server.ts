import express, { Application } from 'express';
import routesProduct from '../routes/product';
import routesUser from '../routes/user';
import { Product } from './product';
import { User } from './user';
import { Role } from './role';

 class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConecction();
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        })
    }

    midlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser);
    }

    async dbConecction() {
        try {
            await Product.sync()
            await Role.sync()
            await User.sync();
            console.log('Connection has been estabilished sucessfully');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;