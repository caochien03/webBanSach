import { Button, Divider, Form, Input, message, notification } from "antd";
import { useState } from "react";
import { callLogin } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const onFinish = async (values) => {
        const { username, password } = values;
        setIsLoading(true);
        const res = await callLogin(username, password);
        setIsLoading(false);

        if (res && res.data) {
            localStorage.setItem("access_token", res.data.access_token);
            dispatch(doLoginAction(res.data.user));
            message.success("Đăng nhập người dùng thành công!");
            navigate("/");
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && Array.isArray(res.message) > 0
                        ? res.message[0]
                        : res.message,
                duration: 5,
            });
        }
        console.log("success:", res);
    };
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Đăng nhập người dùng</h1>
            <Divider />
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    margin: "auto",
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginPage;
