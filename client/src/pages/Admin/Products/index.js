import React, { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProductList, deleteProduct } from "../../../api";
import { Popconfirm, Table } from "antd";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function Products() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["admin:products"],
    queryFn: fetchProductList,
  });

  const deleteMutation = useMutation({ mutationFn: deleteProduct });

  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    queryClient.invalidateQueries("admin:products");
                  },
                });
              }}
              onCancel={() => console.log("Canceled!")}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <a href="#"> Delete</a>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error. {error.message}</div>;
  }

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2x1" p="5">
          Products
        </Text>
        <Link to="new">
          <Button>New</Button>
        </Link>
      </Flex>

      <Table dataSource={data} columns={columns} rowKey="_id" />
    </div>
  );
}

export default Products;
