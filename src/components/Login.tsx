import { login } from "@/fetch";
import { Button, Form, FormProps, Input } from "antd";
import { useRouter } from "next/router";
const { Item } = Form;

type FieldType = {
  email: string;
  password: string;
};

interface IProps {
  successCb: () => void;
}

const LoginComponent = ({ successCb }: IProps) => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (await login(values)) {
      successCb();
    } else {
    }
  };

  return (
    <div className="flex flex-col items-center lg:mb-[50%]">
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
          >
            Log In
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default LoginComponent;
