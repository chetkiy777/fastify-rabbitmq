import { Channel } from "amqplib";
import { QUEUE_EVENTS } from "./queues.js";


export function publishEvent(
    channel: Channel,
    payload: unknown
): void {
    channel.sendToQueue(
        QUEUE_EVENTS,
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }
    );
}