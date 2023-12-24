import React from "react";

export const Category1 = () => {
  const categoryId1 = "http://localhost:3000/products/1";
  const categoryId2 = "http://localhost:3000/products/2";
  const categoryId3 = "http://localhost:3000/products/3";
  const categoryId4 = "http://localhost:3000/products/4";
  const categoryId5 = "http://localhost:3000/products/5";

  const fetchedCategories1 = async () => {
    const response = await fetch(categoryId1);

    if (!response.ok) {
      throw new Error("Something Went Wrong !");
    }

    return response.json();
  };

  return;
};
