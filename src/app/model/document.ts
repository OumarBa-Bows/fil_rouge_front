export interface Document {
  id?: number;
  fileName: string;
  fileType: string;
  filePath: string;
  size?: number;
  createdAt?: string; // LocalDateTime serialized as ISO string
}
