import React, { useState, useEffect } from "react";

import { Layout, Menu, Breadcrumb } from "antd";

import { Sidebar } from "./Sidebar/Sidebar";
import { HeaderC } from "./Header/Header";

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

export const LayoutPrivate = ({ children }) => {
  const [collapse, setCollapse] = useState(false);

  const handleToggle = (event) => {
    setCollapse(!collapse)
  };

  return (
    <Layout className="private-layout">
      <Sidebar collapsed={collapse} onCollapse={handleToggle} />
      <Layout className="site-layout">
        <HeaderC />
        <main>{children} </main>
      </Layout>
    </Layout>
  );
};
