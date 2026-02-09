declare module "amqplib" {
    export interface Channel {
        assertQueue(queue: string, options?: any): Promise<any>;
        sendToQueue(queue: string, content: Buffer, options?: any): boolean;
        consume(queue: string, onMessage: (msg: any) => void, options?: any): Promise<any>;
        ack(message: any): void;
        close?(): Promise<void>;
    }

    export interface Connection {
        createChannel(): Promise<Channel>;
        close(): Promise<void>;
    }

    export function connect(url: string): Promise<Connection>;

    const amqplib: {
        connect(url: string): Promise<Connection>;
    };

    export default amqplib;
    export type { Channel, Connection };
}