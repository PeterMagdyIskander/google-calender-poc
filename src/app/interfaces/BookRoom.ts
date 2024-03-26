import { Time } from "./Time";

export interface BookRoom {
    id: number;
    from: Time;
    to: Time;
    rooms: string[];
    code: string;
    name: string;
    hiddenFor: string[];
    category: string,
    showOperation: boolean,
}
