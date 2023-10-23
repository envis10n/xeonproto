import { Collection, Document } from 'https://deno.land/x/darango@0.1.6/mod.ts';
import db from './db.ts';
import { Option } from './shared/helpers.ts';
import { hash as genHash, verify } from './auth.ts';

export interface Account {
    username: string;
    hash: string;
    salt: string;
    created: number;
    last_login: number;
    uuid: string;
}

let _accounts: Option<Collection<Account>> = null;

export async function accounts(): Promise<Collection<Account>> {
    if (_accounts == null) {
        _accounts = await db.collection('accounts');
    }
    return _accounts;
}

export async function createAccount(
    username: string,
    password: string,
): Promise<Option<Document<Account>>> {
    const col = await accounts();
    if ((await col.findOne({ username })) != undefined) {
        return null;
    }
    const { hash, salt } = await genHash(password);
    const ts: number = Date.now();
    const uuid: string = crypto.randomUUID();
    return await col.create({
        username,
        hash,
        salt,
        uuid,
        created: ts,
        last_login: ts,
    });
}

export async function authAccount(
    username: string,
    password: string,
): Promise<Option<Document<Account>>> {
    const col = await accounts();
    const account = await col.findOne({ username });
    if (account == undefined) return null;
    const auth = await verify(password, account.hash, account.salt);
    if (!auth) return null;
    else return account;
}
