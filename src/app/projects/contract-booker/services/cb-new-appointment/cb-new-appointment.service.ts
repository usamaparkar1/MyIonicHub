import { CbDbAppointmentsService } from '../cb-db-appointments/cb-db-appointments.service';
import { CbAppointment } from '../../models/cb-appoinment';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class CbNewAppointmentService {

    cbMinutesAllowed: number[] = [0, 15, 30, 45];

    constructor(
        private _cbDbAppointmentsService: CbDbAppointmentsService
    ) { }

    getDefaultDate() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        // If today is Sunday (0), set default date to Monday
        if (dayOfWeek === 0) {
            today.setDate(today.getDate() + 1);
        }

        return this.getFormattedDate(today);
    }

    getFormattedDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };

        return date.toLocaleDateString('en-GB', options);
    }

    getDefaultTime() {
        const currentDate = new Date();
        const minuteValues = [0, 15, 30, 45];
        const currentMinutes = currentDate.getMinutes();
        let nextMinuteIndex = 0;

        // Find the next minute value index in the array
        for (let i = 0; i < minuteValues.length; i++) {
            if (minuteValues[i] > currentMinutes) {
                nextMinuteIndex = i;
                break;
            }
        }

        // If no next minute value is found, set it to the first minute value in the array
        if (nextMinuteIndex === 0) {
            currentDate.setMinutes(minuteValues[0]);
        } else {
            // Set the adjusted minutes to the next minute value in the array
            currentDate.setMinutes(minuteValues[nextMinuteIndex]);
        }

        // Check if current minute is greater than 45, then increment hour
        if (currentMinutes > 45) {
            currentDate.setHours(currentDate.getHours() + 1);
        }

        return this.getFormattedTime(currentDate);
    }

    getFormattedTime(currentDate: Date): string {
        return currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    getAllowedDays(dateString: string) {
        const date = new Date(dateString);
        const utcDay = date.getUTCDay();

        return utcDay !== 0;
    }

    getNewAppointmentFormData(
        appointmentTitle: string,
        appointmentDescription: string,
        appointmentDate: string,
        appointmentTime: string,
        state: string,
        city: string,
        postCode: string,
        appointments: CbAppointment[]
    ) {
        const id: string = this._getAppointmentId(appointments);
        return new CbAppointment({ id, appointmentTitle, appointmentDescription, appointmentDate, appointmentTime, state, city, postCode });
    }

    private _getAppointmentId(appointments: CbAppointment[]): string {
        let newAppointmentId: string;
    
        if (appointments?.length > 0) {
            let appointmentIdExists: boolean;
            do {
                newAppointmentId = uuidv4(); // Generate a new UUID
                // Check if any appointment already has this ID
                appointmentIdExists = appointments.some((appointment) => appointment.id === newAppointmentId);
            } while (appointmentIdExists); // Continue generating until unique ID found
        } else {
            // If appointments array is empty, generate a new UUID directly
            newAppointmentId = uuidv4();
        }

        return newAppointmentId;
    }

    async addNewAppoitment(newAppointment: CbAppointment): Promise<boolean | null> {
        return await this._cbDbAppointmentsService.set(newAppointment);
    }

    async getAppointmentById(oldAppointmentId: string): Promise<CbAppointment | null> {
        try {
            const oldAppointmentData = await this._cbDbAppointmentsService.get(oldAppointmentId);
            
            if (oldAppointmentData) {
                return new CbAppointment(oldAppointmentData);
            }
    
            return null;  
        } catch (error) {
            return null;
        }
    }

    async saveEditedAppointment(editAppointmentData: CbAppointment, oldAppointmentId: string) {
        editAppointmentData.id = oldAppointmentId;
        return await this._cbDbAppointmentsService.set(editAppointmentData);
    }
}
