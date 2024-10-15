import React, { ReactElement } from "react";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import { RETAILRE_PATH_MAP } from "@/const/retail";
import { useRouter } from "next/router";
import { getLastPathSegment, LogOut } from "@/utils";

const { Header, Content, Sider } = Layout;

interface IProps {
  pathname: string;
  children: ReactElement | ReactElement[];
}

const RetailerLayout = ({ pathname, children }: IProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const lastPath = getLastPathSegment(pathname);
  const clickMenu: MenuProps["onClick"] = (e) => {
    router.push("/retailer/" + e.key);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span onClick={LogOut}>Layout</span>,
    },
  ];

  return (
    <Layout className="h-screen">
      <Header className="flex items-center justify-between">
        <header className="text-white text-2xl">E-commerce Retailer MS</header>
        <Dropdown menu={{ items }}>
          <Avatar className="bg-red-500 hover:cursor-pointer">H</Avatar>
        </Dropdown>
      </Header>
      <Content className="p-4">
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              style={{ height: "100%" }}
              items={RETAILRE_PATH_MAP}
              onClick={clickMenu}
              defaultSelectedKeys={[lastPath || ""]}
            />
          </Sider>
          <Content className="p-4 min-h-32">{children}</Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default RetailerLayout;
