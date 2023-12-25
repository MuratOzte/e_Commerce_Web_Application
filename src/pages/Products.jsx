import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const Products = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const baseUrl = "http://localhost:3000/products/";

  useEffect(() => {
    const fetchedCategories = async () => {
      try {
        const response = await fetch(baseUrl + id);

        if (!response.ok) {
          throw new Error("Something Went Wrong !");
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchedCategories();
  }, [id, baseUrl]);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>

      <h1>{id}</h1>
    </>
  );
};

export default Products;
