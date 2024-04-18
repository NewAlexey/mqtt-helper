export function getProcessEnv(envKey: string): string | number | never {
    // @ts-ignore
    const value = process.env[envKey];

    if (!value) {
        throw new Error(`Env variable ${envKey} does not exist.`);
    }

    return value;
}
