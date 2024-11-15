import { Button, Form, FormProps, Input } from "antd";
import { useState } from "react";
const { Item } = Form;

type FieldType = {
  email: string;
  password: string;
};

interface IProps {
  logFun: (param: any) => any;
  successCb: () => void;
  p: string;
}

const LoginComponent = ({ successCb, p, logFun }: IProps) => {
  const [loading, setLoading] = useState(false);
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      if (await logFun({ ...values, p })) {
        successCb();
      } else {
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-[50%]">
      <span className="text-[28px] font-bold mb-2">Log In</span>
      <Form
        className="w-72 p-2"
        autoComplete="off"
        onFinish={onFinish}
        hideRequiredMark
      >
        <Item
          name={"email"}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Enter your email" size="large" />
        </Item>
        <Item
          name={"password"}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" size="large" />
        </Item>
        <Item>
          <Button
            className="w-full"
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
          >
            Log In
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default LoginComponent;
