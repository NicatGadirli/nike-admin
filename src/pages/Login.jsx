/* ---------------------------------- React --------------------------------- */
import { useContext } from "react";

/* --------------------------------- Router --------------------------------- */
import { useNavigate } from "react-router-dom";

/* ------------------------- React Hook Form && Yup ------------------------- */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

/* --------------------------------- Context -------------------------------- */
import { Auth } from "../utils/Auth";


const Login = () => {
  /* --------------------------------- Context -------------------------------- */
  const { setToken } = useContext(Auth);
  /* -------------------------------- Navigate -------------------------------- */
  const navigate = useNavigate();


  /* --------------------------------- Schema --------------------------------- */
  const registerSchema = object({
    email: string().required().trim().email(),
    password: string().required().trim().min(8).max(18),
  });

  /* ----------------------------- React Hook Form ---------------------------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });



  /* --------------------------------- Confirm -------------------------------- */
  const onSubmit = (data) => {
    navigate("/");
    setToken(true);
  };
  return (
    <section className="login">
      <div className="container">
        <div className="row">
          <h2>Login Page</h2>
          <div className="login-box">
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}>
              <div className="user-box">
                <input 
                type="email" 
                name="email"  
                {...register("email")} />
                <label>Email</label>
              </div>
              {errors.email && <span className="errorMsg">{errors.email.message}</span>}
              <div className="user-box">
                <input 
                type="password" 
                name="password" 
                {...register("password")} />
                <label>Password</label>
              </div>
              {errors.password && <span className="errorMsg">{errors.password.message}</span>}
              <div>
                <button type="submit" className={errors.email || errors.password ? "error" : ""}>
                  Login
                  <span className={errors.email || errors.password ? "error" : ""}></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
