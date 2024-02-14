import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "../../../api.js";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
} from "@chakra-ui/react";
function Orders() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["admin:orders"],
    queryFn: () => fetchOrder(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  return (
    <div>
      <Text fontSize="2xl" p="5">
        Orders
      </Text>

      <Table variant="simple">
        <TableCaption>sdasadfsdaf</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Address</Th>
            <Th isNumeric>Items</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              <Td>{item.user.email}</Td>
              <Td>{item.adress}</Td>
              <Td isNumeric>{item.items.length}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Orders;
