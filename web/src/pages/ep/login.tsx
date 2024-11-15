import LoginComponent from "@/components/Login";
import { epLogin } from "@/fetch";

const Login = () => {
  return (
    <div className="h-screen flex justify-center">
      <LoginComponent
        logFun={epLogin}
        p="ep"
        successCb={() => {
          window.location.href = "/ep";
        }}
      />
    </div>
  );
};

export default Login;
