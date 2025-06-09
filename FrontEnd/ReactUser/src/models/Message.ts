export class Message {
    MessageId: number;
    UserId: number;
    SenderId: number;
    MessageContent: string;
    MessageDate: Date;
    constructor(data: Partial<Message> = {}) {
        this.MessageId = data.MessageId ?? 0;
        this.UserId = data.UserId ?? 0;
        this.SenderId = data.SenderId ?? 0;
        this.MessageContent = data.MessageContent ?? "defalt content";
        this.MessageDate = data.MessageDate ?? new Date();
    }
}

export class MessagePost {
    UserId: number;
    SenderId: number;
    MessageContent: string;
    MessageDate: Date;
    constructor(data: Partial<Message> = {}) {
        this.UserId = data.UserId ?? 0;
        this.SenderId = data.SenderId ?? 0;
        this.MessageContent = data.MessageContent ?? "defalt content";
        this.MessageDate = data.MessageDate ?? new Date();
    }
}
