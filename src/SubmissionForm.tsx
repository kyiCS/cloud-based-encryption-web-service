import { useState } from "react";
import { Form, Select, Button, Card, message, Radio, Input, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { uploadAndStartJob } from "./helpers";
import { EncryptionLayer } from "./types";

const SubmissionForm = () => {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [file, setFile] = useState<File | null>(null);
  const [doubleLayer, setDoubleLayer] = useState(false);
  const formItemLayout = {
    labelCol: { span: 4, offset: 6 },
    wrapperCol: { span: 4 },
  };
  const onFinish = (values: {
    firstLayerEncryptionType: "aes" | "fernet";
    firstLayerSecretKey: string;
    secondLayerEncryptionType: "none" | "aes" | "fernet";
    secondLayerSecretKey: string;
    emails: { email: string }[];
  }) => {
    console.log(values);
    const layers: EncryptionLayer[] = [
      {
        encryption_type: values.firstLayerEncryptionType,
        secret_key: values.firstLayerSecretKey,
      },
    ];
    if (values.secondLayerEncryptionType !== "none")
      layers.push({
        encryption_type: values.secondLayerEncryptionType,
        secret_key: values.secondLayerSecretKey,
      });
    const emails: string[] = values.emails.map(
      (entry: { email: string }) => entry.email
    );
    if (file === null) throw Error("File should not be null!");
    uploadAndStartJob(mode, file, layers, emails).then(() =>
      message.success(`Successfully started ${mode} job`)
    );
  };
  const onFinishFailed = (errorInfo: any) => {
    message.error("Failed to submit:", errorInfo);
  };
  return (
    <Card>
      <Form
        name="form"
        {...formItemLayout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          mode: "encrypt",
          firstLayerEncryptionType: "aes",
          secondLayerEncryptionType: "none",
        }}
      >
        <Form.Item
          name="mode"
          label="Mode"
          rules={[{ required: true, message: "Please select a mode" }]}
        >
          <Radio.Group
            buttonStyle="solid"
            onChange={(e) => setMode(e.target.value)}
          >
            <Radio.Button value="encrypt">Encrypt</Radio.Button>
            <Radio.Button value="decrypt">Decrypt</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="file"
          label={`File to ${mode}`}
          valuePropName="none" // uncontrolled
          rules={[{ required: true, message: "Please choose a file" }]}
        >
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files !== null && e.target.files.length !== 0)
                setFile(e.target.files[0]);
            }}
          />
        </Form.Item>

        <Form.Item
          name="firstLayerEncryptionType"
          label={`1st layer ${mode}ion type`}
          rules={[
            { required: true, message: "Please select an encryption type" },
          ]}
        >
          <Select>
            <Select.Option value="aes">AES</Select.Option>
            <Select.Option value="fernet">Fernet</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="firstLayerSecretKey"
          label="1st layer secret key"
          rules={[
            { required: true, message: "Please enter a secret key" },
            {
              max: 32,
              message: "Secret keys must be 32 characters or less",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="secondLayerEncryptionType"
          label={`2nd layer ${mode}ion type`}
          rules={[
            { required: true, message: "Please select an encryption type" },
          ]}
        >
          <Select
            onChange={(value) =>
              value === "none" ? setDoubleLayer(false) : setDoubleLayer(true)
            }
          >
            <Select.Option value="none">None</Select.Option>
            <Select.Option value="aes">AES</Select.Option>
            <Select.Option value="fernet">Fernet</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="secondLayerSecretKey"
          label="2nd layer secret key"
          rules={[
            { required: doubleLayer, message: "Please enter a secret key" },
            {
              max: 32,
              message: "Secret keys must be 32 characters or less",
            },
          ]}
        >
          <Input.Password disabled={!doubleLayer} />
        </Form.Item>

        <Form.Item
          name="emails"
          label="Notification emails"
          valuePropName="emails"
          rules={[
            { required: true, message: "Please enter at least one email" },
          ]}
        >
          {/* Source: https://ant.design/components/form/#components-form-demo-dynamic-form-items */}
          <Form.List name="emails">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ marginBottom: "0", display: "flex" }}
                    align="baseline"
                  >
                    <Form.Item
                      name={[name, "email"]}
                      fieldKey={[fieldKey, "email"]}
                      style={{ marginBottom: "0" }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter an email address",
                        },
                      ]}
                    >
                      <Input type="email" placeholder="Email" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    add email
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <br />

        <Form.Item wrapperCol={{ span: 3, offset: 10 }}>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default SubmissionForm;
