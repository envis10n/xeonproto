export interface Entity {
    uuid: string;
    tick(delta: number): void;
}
