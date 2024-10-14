import LoginComponent from "@/components/Login";
import { Layout } from "antd";
const { Header, Content } = Layout;

const Login = () => {
  return (
    <Layout className="h-screen">
      <Header className="flex items-center justify-between">
        <header className="text-white text-2xl">E-commerce Retailer MS</header>
      </Header>
      <Content className="h-full flex items-center justify-center">
        <div className="flex px-4">
          <LoginComponent />
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
