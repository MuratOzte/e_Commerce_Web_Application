import { useEffect, useState } from "react";
import DiscountedProducts from "../components/products/DiscountedProducts";
import { useSelector } from "react-redux";

const DiscountedProductsPage = () => {
  const token = useSelector((state) => state.login.token);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);

  const baseUrl = "http://localhost:3000/discountProducts";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Something Went Wrong !");
        }

        const fetchedData = await response.json();
        setResult(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, token]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading &&
        result &&
        result.products
          .reduce((acc, product, index) => {
            const rowIndex = Math.floor(index / 3);

            if (!acc[rowIndex]) {
              acc[rowIndex] = [];
            }

            acc[rowIndex].push(product);

            return acc;
          }, [])
          .map((rowProducts, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {rowProducts.map((product) => (
                <DiscountedProducts
                  key={product.product_id}
                  price={product.price}
                  codeId={product.code_id}
                  url={product.product_image}
                  title={product.product_name}
                />
              ))}
            </div>
          ))}
    </>
  );
};

export default DiscountedProductsPage;
