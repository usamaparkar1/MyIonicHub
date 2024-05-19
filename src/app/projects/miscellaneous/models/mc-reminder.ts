import { Schedule } from "@capacitor/local-notifications";

export class McReminder implements McIReminder {
    id: number;
    title: string;
    interval: number;
    description: string;
    schedule?: Schedule;

    constructor(reminder: McReminder) {
        this.id = reminder.id;
        this.title = reminder.title;
        this.interval = reminder.interval;
        this.description = reminder.description;
        this.schedule = reminder.schedule;
    }
}

export interface McIReminder {
    id: number;
    title: string;
    interval: number;
    description: string;
    schedule?: Schedule;
}