import { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import "./Login.scss";

const Login = () => {

  const { isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    if (isSuccess) {
      navigate("/home");
    }
    dispatch(reset());
  }, [isError, isSuccess, message]);

  const onFinish = async (values) => {
    setLoading(true);
    await dispatch(login(values));
    setLoading(false);
  };

  return (
    <div className="login">
      <div className="container">
        <div className="picture">
        </div>
        <div className="text">Valencia Spots
          <div className="subtext"> Descubre las mejores rutas<br /> en Valencia</div> </div>
      </div>

      <div className="loginForm">
        <Form
          className="form"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor, introduce tu correo electrónico",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor, introduce su contraseña",
              },
            ]}
          >
            <Input.Password placeholder="Contraseña" />
          </Form.Item>
          <Form.Item>
            <Button className="submitbtn" htmlType="submit" loading={loading}>
              Enviar
            </Button>
          </Form.Item>
        </Form>

        <span>
          ¿Todavía no tienes cuenta? <Link to="/register">Regístrate</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
