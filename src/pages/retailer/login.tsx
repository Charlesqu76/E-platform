import LoginComponent from "@/components/Login";

const Login = () => {
  return (
    <LoginComponent
      p="retailer"
      successCb={() => {
        window.location.href = "/retailer/product";
      }}
    />
  );
};

export default Login;
