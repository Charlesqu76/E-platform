import LoginComponent from "@/components/Login";

const Login = () => {
  return (
    <LoginComponent
      p="/retailer"
      successCb={() => {
        window.location.reload();
      }}
    />
  );
};

export default Login;
