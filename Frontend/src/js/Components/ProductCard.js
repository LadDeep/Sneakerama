import React from "react";
import "../../css/ProductCard.css";
import { EditFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  console.log(product);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/inventory/edit-product", { state: { product } });
  };
  return (
    <>
      <div className="card-container">
        <img
        alt="product"
          src={product.image.length > 0 && product.image[0]}
          style={{
            objectFit: "contain",
            width: "300px",
            height: "300px",
            margin: "1rem",
          }}
        />
        <h2>
          {product.brand} {product.model}
        </h2>
        <div className="card-display-contianer">
          <div className="card-display">
            <h4>Category</h4> <p>{product.category}</p>
          </div>
          <div className="card-display">
            <h4>Gender</h4> <p>{product.gender}</p>
          </div>
        </div>
        {product.availableSizes && product.availableSizes.length > 0 ? (
          <p className="tag-green">In Stock</p>
        ) : (
          <p className="tag-red">Out of Stock</p>
        )}
        <EditFilled
          className="card-edit-button"
          onClick={handleEdit}
        ></EditFilled>
      </div>
    </>
  );
};

export default ProductCard;
