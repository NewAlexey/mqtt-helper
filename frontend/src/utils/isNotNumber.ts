export function isNotNumber(value: unknown): boolean {
    return !Number.isNaN(Number(value));
}
