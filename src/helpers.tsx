import { v4 as uuid4 } from "uuid";
import { API, Storage, Auth } from "aws-amplify";
import { EncryptionLayer, RequestBody } from "./types";

export const uploadAndStartJob = async (
  mode: "encrypt" | "decrypt",
  file: File,
  encryptionLayers: EncryptionLayer[],
  notificationEmails: string[]
): Promise<void> => {
  if (mode !== "encrypt" && mode !== "decrypt")
    throw new Error(`Invalid mode: ${mode}`);

  const uuid = uuid4();
  const userId = await Auth.currentUserInfo().then((info) => info.id);
  const keyPrefix = `private/${userId}/`;
  const inputKeySuffix = `files/to-${mode}/${uuid}-${file.name}`;
  const outputKeySuffix = `files/${mode}ed/${uuid}-${file.name}`;

  return Storage.put(inputKeySuffix, file, {
    level: "private",
    contentType: file.type,
  })
    .then(() => {
      const body: RequestBody = {
        file_name: file.name,
        input_object_key: keyPrefix + inputKeySuffix,
        output_object_key: keyPrefix + outputKeySuffix,
        encryption_layers: encryptionLayers,
        notification_emails: notificationEmails,
      };
      return API.post("cs443projectapi", `/${mode}`, { body })
        .then(console.log)
        .catch(console.error);
    })
    .catch(console.error);
};
