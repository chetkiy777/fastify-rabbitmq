import { FastifyInstance } from "fastify";
import { publishEvent } from "../rabbit/producer.js";
import crypto from "node:crypto";

export async function eventRoutes(
    fastify: FastifyInstance,
    options: { channel: any }
) {
    fastify.post("/events", async (request) => {
        const event = {
            id: crypto.randomUUID(),
            type: "USER_CREATED",
            data: request.body,
            createdAt: new Date().toISOString()
        };

        publishEvent(options.channel, event);

        return { status: "queued", event };
    });
}
