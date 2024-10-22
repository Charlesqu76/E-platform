import LoginComponent from "@/components/Login";

const Login = () => {
  return (
    <LoginComponent
      successCb={() => {
        window.location.href = "/retailer";
      }}
    />
  );
};

export default Login;
