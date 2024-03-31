
export interface Reservation {
    id: number;
    date:string;
    from: string;
    to: string;
    roomName: string;
    name: string;
    requesterMail: string;
    hiddenFor: string[];
    roomSetup: string,
    guestsNumber:number,
}
