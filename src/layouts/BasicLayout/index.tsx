"use client";

import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input } from "antd";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import menus from "../../../config/menu";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined />}
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

/**
 * 通用布局
 * @param children
 * @constructor
 */
export default function BasicLayout({ children }: Props) {
  {
    const pathname = usePathname();

    return (
      <div
        id="basicLayout"
        style={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        <ProLayout
          title="面试鸭刷题平台"
          layout="top"
          logo={
            <Image
              src="/assets/logo.png"
              height={32}
              width={32}
              alt="面试鸭刷题平台 - 程序员Jelly"
            />
          }
          location={{
            pathname,
          }}
          avatarProps={{
            src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
            size: "small",
            title: "Jelly",
            render: (props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        icon: <LogoutOutlined />,
                        label: "退出登录",
                      },
                    ],
                  }}
                >
                  {dom}
                </Dropdown>
              );
            },
          }}
          actionsRender={(props) => {
            if (props.isMobile) return [];
            return [
              <SearchInput key="search" />,
              <a
                key="github"
                href="https://github.com/jellyLove/mianshiya"
                target="_blank"
              >
                <GithubFilled key="GithubFilled" />
              </a>,
            ];
          }}
          headerTitleRender={(logo, title, _) => {
            return (
              <a>
                {logo}
                {title}
              </a>
            );
          }}
          // 渲染底部栏
          footerRender={() => {
            return <GlobalFooter />;
          }}
          onMenuHeaderClick={(e) => console.log(e)}
          menuDataRender={() => {
            return menus;
          }}
          // 定义了菜单项如何渲染
          menuItemRender={(item, dom) => (
            <Link href={item.path || "/"} target={item.target}>
              {dom}
            </Link>
          )}
        >
          {children}
        </ProLayout>
      </div>
    );
  }
}
