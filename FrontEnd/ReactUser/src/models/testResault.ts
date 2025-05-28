export class TestResult {
    TestId: number;
    UserId: number;
    TestDate: Date;
    ImgURL: string; 
    Summary: string;

    constructor(data: Partial<TestResult> = {}) {
        this.TestId = data.TestId ?? 0;
        this.UserId = data.UserId ?? 0;
        this.TestDate = data.TestDate ?? new Date();
        this.ImgURL = data.ImgURL ?? "";
        this.Summary = data.Summary ?? "No summary available";
    }
}
