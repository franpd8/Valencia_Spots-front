import { Button, Checkbox, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { register, reset } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss"
import Video from "../Video/Video";

const Register = () => {

  const { isError, isSuccess, message } = useSelector((state) => state.auth);
  const [sending, setSending] = useState(false);
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
      setStep(0);
    }
    if (isSuccess) {
      notification.success({
        message: message,
        description: "Puedes hacer el login",
        placement: "bottom"
      });
      navigate("/login");
    }
    dispatch(reset());
  }, [isError, isSuccess, message]);

  const nextRegisterStep = async () => {
    try {
      await form.validateFields(['name', 'email']);
      setStep(1);
    } catch (error) {
      notification.error({ message: "Por favor, comprueba los datos introducidos" });
    }
  }

  const onFinish = async (values) => {
    setSending(true);
    await dispatch(register(values));
    setSending(false);
  };

  return (
    <div className="register">

      <div className="container">
      <div className="picture">
        </div>
        <div className="text">Valencia Spots
          <div className="subtext"> Encuentra los mejores rincones<br/> que visitar</div> 
          </div>
      

      </div>
      <div className="registerForm">
        <Form
          className="form"
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            hidden={step !== 0}
            rules={[
              {
                required: true,
                message: "Por favor, introduce tu nombre",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Nombre" />
          </Form.Item>
          <Form.Item
            name="email"
            hidden={step !== 0}
            rules={[
              {
                type: "email",
                message: "Introduce un email v??lido",
              },
              {
                required: true,
                message: "Por favor, introduce tu email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            hidden={step !== 1}
            rules={[
              {
                required: true,
                message: "Por favor, introduce tu contrase??a",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Contrase??a" />
          </Form.Item>

          <Form.Item
            name="confirm"
            hidden={step !== 1}
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor, confirma tu contrase??a",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Las contrase??as no coinciden")
                  );
                },
              }),
            ]}>
            <Input.Password placeholder="Confirma contrase??a" />
          </Form.Item>
          <Form.Item
            hidden={step !== 0}>
            <Button className="submitbtn" onClick={nextRegisterStep}>
              Siguiente
            </Button>
          </Form.Item>
          <Form.Item
            hidden={step !== 1}>
            <Button className="submitbtn" htmlType="submit" loading={sending}>
              Crear cuenta
            </Button>
          </Form.Item>
        </Form>
        <span>
          ??Ya tienes cuenta?<Link to="/login"> Con??ctate</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
