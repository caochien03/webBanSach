import { Button, Divider, Form, Input, message, notification } from "antd";

const LoginPage = () => {
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const onFinish = (values) => {
        console.log("success:", values);
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
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={false}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginPage;
