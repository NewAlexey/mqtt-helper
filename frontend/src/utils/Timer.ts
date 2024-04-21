interface ITimerProps {
    delay: number;
    handler: () => void;
}

export class Timer {
    public delay: number;

    private readonly handler: () => void;

    private startTime: number | undefined = undefined;
    private remainder: number | undefined = undefined;
    private isRunning: boolean = false;
    private timerId?: NodeJS.Timeout | undefined;

    constructor({ delay, handler }: ITimerProps) {
        this.delay = delay;
        this.handler = handler;
    }

    public run() {
        if (this.isRunning) {
            return;
        }

        this.startTime = Date.now();
        this.timerId = setInterval(() => this.handler(), this.delay);

        this.isRunning = true;
    }

    public unpause() {
        if (!Number.isInteger(this.remainder)) {
            throw new Error("Timer. Check remainder value.");
        }

        setTimeout(() => {
            this.handler();
            this.run();
        }, this.remainder!);
        this.remainder = undefined;
    }

    public pause() {
        clearTimeout(this.timerId);
        this.isRunning = false;
        this.remainder = this.calculateRemainder();
        this.startTime = undefined;
    }

    public stop() {
        clearTimeout(this.timerId);
        this.isRunning = false;
    }

    private calculateRemainder(): number {
        if (!Number.isInteger(this.startTime)) {
            throw new Error("Timer. Check startTime value.");
        }

        return this.delay - ((Date.now() - this.startTime!) % this.delay);
    }
}
