import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api.js";
import { Box, Text, Button } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import moment from "moment";
import { useBasket } from "../../contexts/Basketcontext.js";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["product", product_id],
    queryFn: () => fetchProduct(product_id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error.</div>;
  }

  const findBasketItem = items.find((item) => item._id === product_id);
  const images = data.photos.map((url) => ({ original: url }));

  return (
    <div>
      <Button
        colorScheme={findBasketItem ? "pink" : "green"}
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? "Remove from basket" : "Add to Basket"}
      </Button>
      <Text as="h2" fontSize="2x1">
        {data.title}
      </Text>
      <Text as="h2" fontSize="2x1">
        {moment(data.createdAt).format("DD/MM/YYYY")}
      </Text>
      <p>{data.description}</p>

      <Box margin="10">
        <ImageGallery items={images} />
      </Box>
    </div>
  );
}

export default ProductDetail;
