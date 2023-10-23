export class Timer {
    private _interval: number;
    private _lastTick: number = Date.now();
    constructor(
        private handler: (delta: number) => void,
        private rate: number,
    ) {
        this._interval = setInterval(() => {
            const now = Date.now();
            const delta = now - this._lastTick;
            this._lastTick = now;
            this.handler(delta);
        }, this.rate);
    }
    public cancel(): void {
        clearInterval(this._interval);
    }
}

export async function sleep(duration: number): Promise<void> {
    return await new Promise((resolve, reject) => {
        try {
            setTimeout(resolve, duration);
        } catch (e) {
            reject(e);
        }
    });
}
