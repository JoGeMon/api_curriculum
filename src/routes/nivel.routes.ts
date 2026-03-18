import { FastifyInstance } from "fastify";
import { getNivelesHandler } from "../controllers/nivel.controller";

export async function nivelRoutes(server: FastifyInstance){
    server.get('/', getNivelesHandler)


    
}