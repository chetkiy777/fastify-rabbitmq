import amqp, { Channel } from "amqplib";
import { QUEUE_EVENTS } from "./queues.js";



export async function connectRabbit(url: string): Promise<Channel> {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_EVENTS, { durable: true });

    return channel;
}