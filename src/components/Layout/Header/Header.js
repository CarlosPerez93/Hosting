import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../services/Auth/AuthActions";
import { Layout, Popover, Drawer, Button, Radio, Space } from "antd";
import { IoMdNotifications } from "react-icons/io";
import { TiMediaRecord } from "react-icons/ti";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { onMessageListener, requestForToken } from "../../firebase/firebase";
import Api from "../../../common/Api/Api";
import { useMutation } from "react-query";
import { Token } from "../../../common/Storage/Token";

const { Header } = Layout;

export const HeaderC = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notificationI, setNotificationI] = useState({});
  const [count, setCount] = useState(0);
  const notify = () =>
    toast(<ToastDisplay />, {
      duration: 4000,
      position: "bottom-right",

      style: {
        maxWidth: "15%",
      },

      icon: "🔔",
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });

  function ToastDisplay() {
    return (
      <div className="contentNotification">
        <div className="contentNotificationItem">
          <h1>
            <b>{notificationI && notificationI?.title}</b>
          </h1>
          <p>{notificationI && notificationI?.body}</p>
        </div>
        <img
          className="imgNotification"
          src={notificationI && notificationI?.image}
          alt=""
        />
      </div>
    );
  }
  const handleDrawer = () => {
    setVisible(!visible);
    setCount();
  };

  const contentProfile = (
    <div>
      <Link to="/profile">Perfil</Link>
      <p className="cursor-pointer  " onClick={() => dispatch(auth.logout())}>
        Cerrar sesion
      </p>
    </div>
  );

  onMessageListener()
    .then((payload) => {
      console.log(payload);
      setNotification([
        ...notification,
        {
          messageId: payload?.messageId,
          title: payload?.notification?.title,
          body: payload?.notification?.body,
          image: payload?.notification?.image,
        },
      ]);
      setCount(notification.length + 1);
      setNotificationI({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
        image: payload?.notification?.image,
      });
    })
    .catch((err) => console.log("failed: ", err));

  const dataToken = Token.decode();
  const mutation = useMutation((data) => {
    return Api.put("/person/user/token/" + dataToken.data.idperson, {
      token: data, //url service + Token user + token login
    });
  });

  useEffect(() => {
    if (notificationI?.title) {
      notify();
    }

    requestForToken().then((tooken) => {
      if (tooken !== "") {
        mutation.mutate(tooken);
      }
    });
  }, [notification, notificationI]);

  return (
    <Header className="header">
      <div className="header_title"></div>
      <div className="header_options">
        <>
          <div className="item" onClick={handleDrawer}>
            <IoMdNotifications />
            {count > 0 ? <p className="numNotification"> {count}</p> : <p />}
          </div>

          <Drawer
            title="Notifications"
            closable={true}
            onClose={handleDrawer}
            visible={visible}
            placement="right"
          >
            {notification.map((item, key) => (
              <div className="header_options-drawer-main" key={key}>
                <div className="mainItem">
                  <div className="item1">
                    <TiMediaRecord className="item0" />
                    <h1>{item.title}</h1>
                  </div>
                  <p>{item.body}</p>
                </div>

                <img src={item.image} alt="alt" />
              </div>
            ))}
          </Drawer>
        </>
        <Popover placement="top" content={contentProfile} trigger="click">
          <img src="https://cdn.pixabay.com/photo/2017/01/30/23/52/female-2022387_1280.png" />
        </Popover>
      </div>
      <Toaster />
    </Header>
  );
};
