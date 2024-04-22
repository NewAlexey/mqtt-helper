interface ITimerProps {
    frequency: number;
    handler?: () => void;
}

export class Timer {
    public frequency: number;

    private handler: (() => void) | undefined;

    private startTime: number | undefined = undefined;
    private remainder: number | undefined = undefined;
    private isHandlerRunning: boolean = false;
    private timerId?: NodeJS.Timeout | undefined;

    constructor({ frequency, handler }: ITimerProps) {
        this.frequency = frequency;

        if (handler) {
            this.handler = handler;
        }
    }

    public run() {
        if (!this.handler) {
            throw new Error("You don't pass handler in Timer.");
        }

        if (this.isHandlerRunning) {
            return;
        }

        this.startTime = Date.now();
        this.timerId = setInterval(() => this.handler!(), this.frequency);

        this.isHandlerRunning = true;
    }

    public unpause() {
        if (!this.handler) {
            throw new Error("You don't pass handler in Timer.");
        }

        if (!Number.isInteger(this.remainder)) {
            throw new Error("Timer. Check remainder value.");
        }

        setTimeout(() => {
            this.handler!();
            this.run();
        }, this.remainder!);
        this.remainder = undefined;
    }

    public pause() {
        clearTimeout(this.timerId);
        this.isHandlerRunning = false;
        this.remainder = this.calculateRemainder();
        this.startTime = undefined;
    }

    public stop() {
        clearTimeout(this.timerId);
        this.isHandlerRunning = false;
    }

    public setHandler(handler: () => void): void {
        this.handler = handler;
    }

    private calculateRemainder(): number {
        if (!Number.isInteger(this.startTime)) {
            throw new Error("Timer. Check startTime value.");
        }

        return (
            this.frequency - ((Date.now() - this.startTime!) % this.frequency)
        );
    }
}
