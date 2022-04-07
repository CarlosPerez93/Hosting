import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  RiStarLine,
  RiSettings5Line,
  RiDashboardLine,
  RiBookMarkFill,
  RiBuilding4Line,
} from "react-icons/ri";
import { FiUsers, FiBarChart } from "react-icons/fi";
import { TiBook } from "react-icons/ti";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/LogoWhite.png";
import Icon from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import { Token } from "../../../common/Storage/Token";

const { Sider } = Layout;

export const Sidebar = ({ collapsed, onCollapse }) => {
  const userData = jwt_decode(Token.getToken());

  useEffect(() => {
    window.innerWidth <= 900 && onCollapse();
  }, [window]);

  return (
    <Sider className="sidebar" trigger={null} collapsible collapsed={collapsed}>
      <img className="sidebar_logo" alt="logo" src={logo} />
      {!collapsed ? (
        <HiOutlineChevronLeft
          className="sidebar_left cursor-pointer"
          onClick={onCollapse}
        />
      ) : (
        <HiOutlineChevronRight
          className="sidebar_left cursor-pointer"
          onClick={onCollapse}
        />
      )}
      {userData?.data.nameRole === "USER" ? (
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          defaultOpenKeys={[window.location.pathname]}
        >
          <Menu.Item key="/" icon={<Icon component={RiDashboardLine} />}>
            <Link className="ml-menu" to="/">
              Inicio
            </Link>
          </Menu.Item>
          <Menu.Item
            key="/campaingCompany"
            icon={<Icon component={RiBookMarkFill} />}
          >
            <Link className="ml-menu" to="/campaingCompany">
              Campañas
            </Link>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<Icon component={RiStarLine} />}>
            <Link className="ml-menu" to="/profile">
              Perfil
            </Link>
          </Menu.Item>
        </Menu>
      ) : (
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          defaultOpenKeys={[window.location.pathname]}
        >
          <Menu.Item key="/" icon={<Icon component={RiDashboardLine} />}>
            <Link className="ml-menu" to="/">
              Inicio
            </Link>
          </Menu.Item>
          <Menu.Item key="/campaing" icon={<Icon component={RiBookMarkFill} />}>
            <Link className="ml-menu" to="/campaing">
              Campañas
            </Link>
          </Menu.Item>
          <Menu.Item key="/users" icon={<Icon component={FiUsers} />}>
            <Link className="ml-menu" to="/users">
              Usuarios
            </Link>
          </Menu.Item>
          <Menu.Item key="/plan" icon={<Icon component={TiBook} />}>
            <Link className="ml-menu" to="/plan">
              Planes
            </Link>
          </Menu.Item>
          <Menu.Item key="/company" icon={<Icon component={RiBuilding4Line} />}>
            <Link className="ml-menu" to="/company">
              Empresas
            </Link>
          </Menu.Item>
          <Menu.Item
            key="/progrescompany"
            icon={<Icon component={FiBarChart} />}
          >
            <Link className="ml-menu" to="/progrescompany">
              Progreso Empresa
            </Link>
          </Menu.Item>
          <Menu.Item
            key="/payments"
            icon={<Icon component={IoCalendarOutline} />}
          >
            <Link className="ml-menu" to="/payments">
              Pagos
            </Link>
          </Menu.Item>
          <Menu.Item key="/testimony" icon={<Icon component={RiStarLine} />}>
            <Link className="ml-menu" to="/testimony">
              Testimonios
            </Link>
          </Menu.Item>
          <Menu.Item key="#" icon={<Icon component={RiSettings5Line} />}>
            <Link className="ml-menu" to="#">
              Configuración
            </Link>
          </Menu.Item>
        </Menu>
      )}
    </Sider>
  );
};
