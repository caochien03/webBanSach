import React, { useState } from "react";
import {
    AppstoreOutlined,
    ExceptionOutlined,
    HeartTwoTone,
    TeamOutlined,
    UserOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space } from "antd";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "./layout.scss";
import { useSelector } from "react-redux";

const { Content, Footer, Sider } = Layout;

const items = [
    {
        label: <Link to="/admin">Dashboard</Link>,
        key: "dashboard",
        icon: <AppstoreOutlined />,
    },
    {
        label: <span>Manage Users</span>,
        // key: 'user',
        icon: <UserOutlined />,
        children: [
            {
                label: <Link to="/admin/user">CRUD</Link>,
                key: "crud",
                icon: <TeamOutlined />,
            },
            {
                label: "Files1",
                key: "file1",
                icon: <TeamOutlined />,
            },
        ],
    },
    {
        label: <Link to="/admin/book">Manage Books</Link>,
        key: "book",
        icon: <ExceptionOutlined />,
    },
    {
        label: <Link to="/admin/order">Manage Orders</Link>,
        key: "order",
        icon: <DollarCircleOutlined />,
    },
];

const itemsDropdown = [
    {
        label: <label>Quản lý tài khoản</label>,
        key: "account",
    },
    {
        label: <label>Đăng xuất</label>,
        key: "logout",
    },
];
const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const user = useSelector((state) => state.account.user);

    return (
        <Layout style={{ minHeight: "100vh" }} className="layout-admin">
            <Sider
                theme="light"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div style={{ height: 32, margin: 16, textAlign: "center" }}>
                    Admin
                </div>
                <Menu
                    defaultSelectedKeys={[activeMenu]}
                    mode="inline"
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                />
            </Sider>
            <Layout>
                <div className="admin-header">
                    <span>
                        {React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: "trigger",
                                onClick: () => setCollapsed(!collapsed),
                            }
                        )}
                    </span>
                    <Dropdown
                        menu={{ items: itemsDropdown }}
                        trigger={["click"]}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Welcome {user?.fullName}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Content>
                    <Outlet />
                </Content>
                <Footer style={{ padding: 0 }}>
                    &copy; 2023. Made with <HeartTwoTone />
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
