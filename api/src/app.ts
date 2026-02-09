import Fastify from "fastify";
import { connectRabbit } from "./rabbit/connection.js";
import { eventRoutes } from "./routes/events.js";

const app = Fastify({ logger: true });

async function wait(ms: number) {
    return new Promise(res => setTimeout(res, ms));
}

async function start() {
    while (true) {
        try {
            const channel = await connectRabbit(process.env.RABBITMQ_URL!);

            app.register(eventRoutes, { channel });

            await app.listen({ port: 3000, host: "0.0.0.0" });

            app.log.info("🚀 API started");
            break;
        } catch (err) {
            app.log.error("Failed to start the API, retrying...");
            await wait(3000);
        }
    }
}

start();
