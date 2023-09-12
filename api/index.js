import express , {json} from 'express';
import ownersRouter from './owners.js'
import  restaurantRouter  from './restaurants.js';
import ratingRouter from './ratings.js';

const server = express();
server.use(json());

server.use('/api/owners' , ownersRouter)
server.use("/api/restaurants", restaurantRouter);
server.use("/api/ratings", ratingRouter);




export default server ;
