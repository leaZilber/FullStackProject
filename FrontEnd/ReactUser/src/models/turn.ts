export class Turn {
    TurnId: number;
    UserId: string;
    DoctorName: string;
    DateTurn: Date;
    TurnLocate: string;
    Hour: string;
    ArrivalConfirmation: boolean;

    constructor(data: Partial<Turn> = {}) {
        this.TurnId = data.TurnId ?? 0;
        this.UserId = data.UserId ?? "Unidentified user";
        this.DoctorName = data.DoctorName ?? "Unidentified doctor";
        this.DateTurn = data.DateTurn ?? new Date();
        this.TurnLocate = data.TurnLocate ?? "Unidentified Location";
        this.ArrivalConfirmation = data.ArrivalConfirmation ?? false;

        // חישוב שעה בפורמט 12:30
        const hours = this.DateTurn.getHours().toString().padStart(2, '0');
        const minutes = this.DateTurn.getMinutes().toString().padStart(2, '0');
        this.Hour = `${hours}:${minutes}`;
    }
}


