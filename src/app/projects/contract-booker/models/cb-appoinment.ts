export class CbAppointment implements IAppointment {
    id: string;
    appointmentTitle: string;
    appointmentDescription: string;
    appointmentDate: string;
    appointmentTime: string;
    state: string;
    city: string;
    postCode: string

    constructor(cbAppointments: CbAppointment) {
        this.id = cbAppointments.id;
        this.appointmentTitle = cbAppointments.appointmentTitle;
        this.appointmentDescription = cbAppointments.appointmentDescription;
        this.appointmentDate = cbAppointments.appointmentDate;
        this.appointmentTime = cbAppointments.appointmentTime;
        this.state = cbAppointments.state;
        this.city = cbAppointments.city;
        this.postCode = cbAppointments.postCode;
    }
}

export interface IAppointment {
    id: string;
    appointmentTitle: string;
    appointmentDescription: string;
    appointmentDate: string;
    appointmentTime: string;
    state: string;
    city: string;
    postCode: string
}