export interface ReportNotice {
    id?: number;
    dateReceipt: string;
    dateSubmission: string;
    typesNotices: string;
    nauticalChartNumber: number;
    source: string;
    email?: string;
    contactPhone?: string;
    numberAndTitle?: string;
    latitude: string;
    longitude: string;
    detailsAnomaly: string;
    attachedDocuments?: string;
}