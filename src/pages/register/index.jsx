import { Button, Divider, Form, Input, message, notification } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callRegisterAPI } from "../../services/api";

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};
const RegisterPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values;
        setIsLoading(true);
        const res = await callRegisterAPI(fullName, email, password, phone);
        setIsLoading(false);
        if (res?.data?._id) {
            message.success("Đăng ký tài khoản thành công!");
            navigate("/login");
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && res.message.length > 0
                        ? res.message[0]
                        : res.message,
                duration: 5,
            });
        }
    };
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Đăng ký người dùng</h1>
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
                    label="Full Name"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: "Please input your full name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
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
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input />
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
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterPage;
