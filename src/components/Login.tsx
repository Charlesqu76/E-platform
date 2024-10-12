import { Button, Form, FormProps, Input } from "antd";
const { Item } = Form;

type FieldType = {
  username?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};
const LoginComponent = () => {
  return (
    <div>
      <Form
        className="w-72 p-2"
        autoComplete="off"
        onFinish={onFinish}
        hideRequiredMark
      >
        <Item
          label="username"
          name={"username"}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="username" />
        </Item>
        <Item
          label="password"
          name={"password"}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input placeholder="password" />
        </Item>
        <Item>
          <Button className="w-full" type="primary" htmlType="submit">
            Log In
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default LoginComponent;
