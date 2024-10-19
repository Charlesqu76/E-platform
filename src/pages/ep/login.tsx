import LoginComponent from "@/components/Login";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoginComponent
        successCb={() => {
          window.location.href = "/";
        }}
      />
    </div>
  );
};

export default Login;
