import { Channel } from "amqplib";
import { QUEUE_EVENTS } from "./queues.js";



export async function startConsumer(channel: Channel) {
    await channel.consume(QUEUE_EVENTS, (msg) => {
        if (!msg) return;

        const event = JSON.parse(msg.content.toString());

        console.log("📥 Event received:", event);

        setTimeout(() => {
            console.log("✅ Event processed:", event.id);
            channel.ack(msg);
        }, 1000);
    });
}