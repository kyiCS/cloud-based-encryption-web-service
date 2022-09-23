export type EncryptionType = "aes" | "fernet";
export type EncryptionLayer = {
  encryption_type: EncryptionType;
  secret_key: string;
};
export type RequestBody = {
  file_name: string;
  input_object_key: string;
  output_object_key: string;
  encryption_layers: EncryptionLayer[];
  notification_emails: string[];
};
