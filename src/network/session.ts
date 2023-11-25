export interface SessionState {
    uuid: string;
    isAuth: boolean;
    accountID: string;
}

export function defaultSession(uuid: string): SessionState {
    return {
        uuid,
        isAuth: false,
        accountID: uuid,
    };
}

export const store: Map<string, SessionState> = new Map();
