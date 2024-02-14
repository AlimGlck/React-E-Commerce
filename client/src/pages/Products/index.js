import React from "react";
import Card from "../../components/Card/index.js";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { fetchProductList } from "../../api.js";
import { useInfiniteQuery } from "@tanstack/react-query";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProductList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const morePagesExist = lastPage?.length === 12;

      if (!morePagesExist) {
        return;
      }

      return pages.length + 1;
    },
  });

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div>
      <Grid templateColumns="repeat(3,1fr)" gap={4}>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Box w="100%" key={item._id}>
                <Card item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Flex mt="10" justifyContent="center">
        <Button onClick={() => fetchNextPage()} isLoading={isFetchingNextPage}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </div>
  );
}

export default Products;
