import React from "react";
import MediaCard from "../Home/MediaCards";

const DiscountedProducts = (props) => {
  return (
    <React.Fragment>
      <MediaCard
        url={props.url}
        title={props.title}
        price={props.price}
        codeId={props.codeId}
      />
    </React.Fragment>
  );
};

export default DiscountedProducts;
