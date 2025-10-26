export type pulseReaction = {
    viewer: string | undefined,
    did: string,
    uri: string,
    count: number,
    unique?: Symbol,
} | undefined;

class Pulse {
    like: pulseReaction = $state();
    repost: pulseReaction = $state();
}
export const pulse = new Pulse();
