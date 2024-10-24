import LoginComponent from "@/components/Login";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoginComponent
        p="/ep"
        successCb={() => {
          window.location.href = "/ep";
        }}
      />
    </div>
  );
};

export default Login;
