import React, { ReactElement, useRef } from "react";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import { RETAILRE_PATH_MAP } from "@/const/retail";
import { useRouter } from "next/router";
import { getLastPathSegment, logOut } from "@/utils";
import { useCommonStore } from "@/store";
import AISupport from "./AISupport";
import { init, RetailerContext, storeApi } from "@/store/r";

const { Header, Content, Sider } = Layout;

interface IProps {
  pathname: string;
  children: ReactElement | ReactElement[];
}

const RetailerLayout = ({ pathname, children }: IProps) => {
  const ref = useRef<storeApi>();
  if (!ref.current) {
    ref.current = init({});
  }
  const { userInfo } = useCommonStore((state) => state);

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
      key: "layout",
      label: <span onClick={logOut}>Layout</span>,
    },
  ];

  return (
    <RetailerContext.Provider value={ref.current}>
      <Layout className="h-screen">
        <Header className="flex items-center justify-between">
          <header className="text-white text-2xl">
            E-commerce Retailer MS
          </header>
          {userInfo && (
            <Dropdown menu={{ items }}>
              <Avatar className="bg-red-500 hover:cursor-pointer">
                {userInfo.name[0].toUpperCase()}
              </Avatar>
            </Dropdown>
          )}
        </Header>
        <Content className="p-4">
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {userInfo && (
              <Sider style={{ background: colorBgContainer }} width={200}>
                <Menu
                  mode="inline"
                  style={{ height: "100%" }}
                  items={RETAILRE_PATH_MAP}
                  onClick={clickMenu}
                  defaultSelectedKeys={[lastPath || ""]}
                />
              </Sider>
            )}

            <Content className="pt-0 px-4 min-h-32">
              <AISupport />
              {children}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </RetailerContext.Provider>
  );
};

export default RetailerLayout;
