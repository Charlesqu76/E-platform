import LoginComponent from "@/components/Login";
import { retailerLogin } from "@/fetch";

const Login = () => {
  return (
    <LoginComponent
      logFun={retailerLogin}
      p="retailer"
      successCb={() => {
        window.location.href = "/retailer/product";
      }}
    />
  );
};

export default Login;
