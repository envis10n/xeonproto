import { ArgonWorker } from '@argon2';
import { decodeHex as decode, encodeHex } from '@std/encoding/hex.ts';

const encoder: TextEncoder = new TextEncoder();
const worker: ArgonWorker = new ArgonWorker();

function generateSalt(): Uint8Array {
    const arr: Uint8Array = new Uint8Array(32);
    crypto.getRandomValues(arr);
    return arr;
}

export async function hash(
    password: string,
): Promise<{ hash: string; salt: string }> {
    await worker.ready;
    const salt = generateSalt();
    const hash = await worker.hash(encoder.encode(password), salt);
    return { hash: encodeHex(hash), salt: encodeHex(salt) };
}

export async function verify(
    password: string,
    hash: string,
    salt: string,
): Promise<boolean> {
    await worker.ready;
    return await worker.verify(
        encoder.encode(password),
        decode(salt),
        decode(hash),
    );
}

export function close() {
    worker.terminate();
}
