import { connectRabbit } from "./rabbit/connection.js";
import { startConsumer } from "./rabbit/consumer.js";


async function wait(ms: number) {
    return new Promise(res => setTimeout(res, ms));
}

async function start() {
    while (true) {
        try {
            const channel = await connectRabbit(process.env.RABBITMQ_URL!);
            await startConsumer(channel);
            console.log("🚀 Worker started");
            break;
        } catch (err) {
            console.error("RabbitMQ not ready, retrying...");
            await wait(3000);
        }
    }
}

start();
