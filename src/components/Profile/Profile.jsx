import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { logout, updateAvatar } from "../../features/auth/authSlice";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  notification,
  Input,
  Upload,
  Space,
  Button,
  Drawer,
  message,
  Steps,
} from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import { updateUser } from "../../features/auth/authSlice";
import Questionnaire from "./Questionnaire/Questionnaire";
const { Paragraph } = Typography;

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    notification.success({ message: "Se desconectó con éxito" });
    navigate("/login");
  };
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(user.user.name);
  const [password, setPassword] = useState();
  const [bio, setBio] = useState(user.user.bio);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [userAvatar, setUserAvatar] = useState(user?.user.avatar);
  const [readyToSend, setReadyToSend] = useState(false);

  const handlePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const handleEdit = async () => {
    setIsLoading(true);
    dispatch(updateUser({ name, bio, password }));

    setTimeout(() => {
      setIsLoading(false);
      setIsEditable(false);
    }, 2000);
  };

  const handleAvatarChange = (info) => {
    const file = info.file;
    // Validations: Type and size
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      notification.error({ message: "Please, select a jpg or png file" });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notification.error({ message: "Image too large" });
    }
    if (isJpgOrPng && isLt2M) {
      setFileList([file]);
      const url = URL.createObjectURL(file);
      setUserAvatar(url);
      setReadyToSend(true);
    }
  };

  const clearImage = () => {
    setUserAvatar(user?.user.avatar);
    setReadyToSend(false);
  };

  const handleRemoveImage = () => {
    setFileList([]);
  };

  const sendNewAvatar = async () => {
    setIsSending(true);
    if (fileList.length > 0) {
      const formData = new FormData();
      formData.append("avatar", fileList[0]);
      await dispatch(updateAvatar(formData));
      setFileList([]);
      setReadyToSend(false);
    }
    setIsSending(false);
  };

  return (
    <div className="profile">
      <div className="userProfile">
        {user.user.role === "admin" ? (
          <div className="admin">
            <Link to="/admin">Admin</Link>
          </div>
        ) : (
          ""
        )}
       
        <div className="profilePicture">
          <Space>
            <Upload
              className="avatarBtn"
              name="avatar"
              showUploadList={false}
              beforeUpload={() => false}
              onRemove={handleRemoveImage}
              onChange={handleAvatarChange}
              customRequest={(a) => console.log(a)}
              fileList={fileList}
            >
              <div
                className="action-button"
                icon={<UploadOutlined />}
                loading={isSending}
              >
                <img src={userAvatar} />
              </div>
            </Upload>
            <Button
              hidden={!readyToSend}
              type="primary"
              onClick={sendNewAvatar}
              loading={isSending}
            >
              Actualizar
            </Button>
            <Button hidden={!readyToSend} onClick={clearImage}>
              Deshacer
            </Button>
          </Space>
        </div>
        <div className="profileName">
          {isEditable ? (
            <Paragraph className="editName" editable={{ onChange: setName }}>
              {name}
            </Paragraph>
          ) : (
            <Paragraph className="editName">{name}</Paragraph>
          )}
        </div>
        <div className="profileEmail">{user.user.email}</div>

        <div className="profileBio">
          {isEditable ? (
            <Paragraph
              className="editBio"
              editable={{
                onChange: setBio,
                maxLength: 300,
                autoSize: { maxRows: 5, minRows: 3 },
              }}
            >
              {bio}
            </Paragraph>
          ) : (
            <Paragraph className="editBio">{bio}</Paragraph>
          )}
        </div>
        <button className="btn" onClick={showDrawer}>
          Preferencias de rutas
        </button>


        {isEditable ? (
          <Button  className="btn" onClick={handleEdit} loading={isLoading}>
            Guardar Cambios
          </Button>
        ) : null}
        <button className="btn editbtn" onClick={() => setIsEditable(!isEditable)}>
          <EditOutlined/>
        </button>
        <div className="logout">
          <Link to="/" onClick={onLogout}>
            Cerrar Sesión
          </Link>
        </div>

        <Drawer
          title="Basic Drawer"
          placement={placement}
          closable={true}
          onClose={onClose}
          visible={visible}
          key={placement}
        >
          <Questionnaire quest={user.user?.questionnaire} />
        </Drawer>
      </div>
    </div>
  );
};

export default Profile;
