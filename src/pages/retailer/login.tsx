import LoginComponent from "@/components/Login";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  return (
    <LoginComponent
      successCb={() => {
        router.push("/retailer").then(() => window.location.reload());
      }}
    />
  );
};

export default Login;
