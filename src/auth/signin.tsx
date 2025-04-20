import { Button, Form, Input } from "antd";

import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { message } from "antd";
import Password from "antd/es/input/Password";
const Signin = () => {
  const nav = useNavigate();
  //   const [message, contextHolder] = useMessage();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data) =>
      await axios.post(`http://localhost:3000/login`, data),

    onSuccess: () => {
      message.success("them san pham thanh cong");
      queryClient.invalidateQueries({ queryKey: ["login"] });
      nav("/");
    },
  });

  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* {contextHolder} */}
      <h2>đăng nhập Công Việc Mới</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Tên công việc"
          rules={[{ required: true, message: "Bắt buộc nhập" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Tên công việc"
          rules={[{ required: true, message: "Bắt buộc nhập" }]}
        >
          <Password />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Thêm Công Việc
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signin;
