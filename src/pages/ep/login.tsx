import LoginComponent from "@/components/Login";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  return (
    <div className="h-screen flex justify-center items-center">
      <LoginComponent
        successCb={() => {
          router.push("/").then(() => window.location.reload());
        }}
      />
    </div>
  );
};

export default Login;
