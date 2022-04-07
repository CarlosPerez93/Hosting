import React from "react";
import InputComponent from "../../../components/Inputs/InputComponent/InputComponent";
import { auth } from "../../../services/Auth/AuthActions";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {Loading} from '../../../components/Loading/Loading'
import logo from "../../../assets/img/LogoWhite.png";


export const Login = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loadingIcon = loading && loading === true ? "Cargando..." : "Entrar"

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm();

  const onSubmit = (data,e) => {
    e.preventDefault();
    dispatch(auth.login(data));  };

  return (
    <div className="login">
      <img className="login__logo" alt="logo" src={logo} />
      <div className="login_content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            {...register('user', { required: true })}
            name="user"
            type="text"
            label="Usuario"
            placeholder=""
            icon="fa fa-user-o"
            className="mb-10"
            error={errors.user}
            errorMsg="Revisa los datos"
          />
          <InputComponent
            {...register('pass', { required: true })}
            name="pass"
            type="password"
            label="Contraseña"
            placeholder=""
            icon="fa fa-user-o"
            className="mb-10"
            error={errors.pass}
            errorMsg="Revisa los datos"
          />
          <input type="submit" className="submit" value={loadingIcon} />
        </form>

      </div>
      <Loading visible={loading}/>
    </div>
  );
};
