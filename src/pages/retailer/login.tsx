import LoginComponent from "@/components/Login";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  return (
    <LoginComponent
      successCb={() => {
        window.location.href = "/retailer";
      }}
    />
  );
};

export default Login;
