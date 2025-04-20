import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import useMessage from "antd/es/message/useMessage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { message } from "antd";
const Create = () => {
  const nav = useNavigate();
  //   const [message, contextHolder] = useMessage();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data) =>
      await axios.post(`http://localhost:3000/tasks`, data),

    onSuccess: () => {
      message.success("them san pham thanh cong");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      nav("/");
    },
  });
  const onFinish = (values) => {
    mutate({
      ...values,
      dueDate: dayjs(values.dueDate).format("YYYY-MM-DD"),
      status: values.status || false,
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* {contextHolder} */}
      <h2>Thêm Công Việc Mới</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Tên công việc"
          rules={[{ required: true, message: "Bắt buộc nhập" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Bắt buộc nhập" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Kì hạn"
          rules={[
            { required: true, message: "Bắt buộc nhập" },
            {
              //   validator: (_, value) => {
              //     if (!value || dayjs(value).isAfter(dayjs(), "day")) {
              //       return Promise.resolve();
              //     }
              //     return Promise.reject("Ngày hết hạn phải ở tương lai");
              //   },

              validator: (_, value) => {
                if (!value || dayjs(value).isAfter(dayjs(), "day")) {
                  return Promise.resolve();
                }
                return Promise.reject("ngay het han phai o tuong lai ");
              },
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Trạng thái công việc"
          rules={[{ required: true, message: "Bắt buộc chọn" }]}
        >
          <Select placeholder="Chọn mức độ ưu tiên">
            <Select.Option value="high">Cao</Select.Option>
            <Select.Option value="medium">Trung bình</Select.Option>
            <Select.Option value="low">Thấp</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Trạng thái" valuePropName="checked">
          <Switch
            checkedChildren="Hoàn thành"
            unCheckedChildren="Chưa hoàn thành"
          />
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

export default Create;
