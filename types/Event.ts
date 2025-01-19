export type Event = {
    name: string;
    once?: boolean;
    execute: (...args: unknown[]) => Promise<void>;
}