export class ReportExportInterface {
  reporter_id: string;
  post_key: number;
  reason: string;
}

export class ReportInterface extends ReportExportInterface {
  id: string;
  version: number;
  deleted: boolean;
}
