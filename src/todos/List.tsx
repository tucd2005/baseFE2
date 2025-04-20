import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Table } from "antd";
import useMessage from "antd/es/message/useMessage";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const List = () => {
  const queryClient = useQueryClient();
  const [message, contextHolder] = useMessage();

  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => (await axios.get(`http://localhost:3000/tasks`)).data,
  });

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      message.success("xoa thanh cong");
    },
  });

  return (
    <div>
      {contextHolder}

      <Button>
        <Link to="/add">THem san pham</Link>
      </Button>
      <Button>
        <Link to={`/signin`}>Login</Link>
      </Button>
      <Button>
        <Link to={`/signup`}>Register</Link>
      </Button>
      <Table
        dataSource={data}
        loading={isLoading}
        columns={[
          {
            title: "title",
            dataIndex: "title",
          },

          {
            title: "description",
            dataIndex: "description",
          },
          {
            title: "status",
            dataIndex: "status",
            render: (status) => (status ? "Hoan thanh" : "chua Hoan thanh"),
          },

          {
            title: "dueDate",
            dataIndex: "dueDate",
          },

          {
            title: "priority",
            dataIndex: "priority",
          },
          {
            title: "hanh dong",
            render: (_, item: { id: number }) => (
              <>
                <Popconfirm
                  title="ban co muon xoa kgong"
                  onConfirm={() => mutate(item.id)}
                >
                  <Button>xoa</Button>
                </Popconfirm>
                <Button>
                  <Link to={`/edit/${item.id}`}>sua</Link>
                </Button>
              </>
            ),
          },
        ]}
      ></Table>
    </div>
  );
};

export default List;
