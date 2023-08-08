import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../../services/authService";
import { backendURL } from "../../constants";
import { Pagination } from "antd";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProductCard from "../Components/ProductCard";
import "../../css/Inventory.css";
import { LoadingOutlined } from "@ant-design/icons";
import inventory from "../../images/inventory.jpg";

const Inventory = () => {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState(0);
  const [page, setPage] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const limit = 10;
  const getProductCount = async () => {
    const userData = await authService.getCurrentUser();
    setUserEmail(userData.data.email);
    try {
      const response = await axios.post(`${backendURL}/products/count`, {
        email: userData.data.email,
      });
      if (response.status === 200) setProductCount(response.data.count);
      setPage(1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductCount();
    // eslint-disable-next-line
  }, []);

  const getProducts = async () => {
    const offset = limit * (page - 1);

    try {
      const response = await axios.post(
        `${backendURL}/products?offset=${offset}`,
        {
          email: userEmail,
        }
      );
      if (response.status === 200) {
        setProducts(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
    // setIsLoading(true)

    // return () => {
    //   setIsLoading(false)
    // }
    // eslint-disable-next-line
  }, [page]);
  return (
    <div>
      <Header />
      <div className="inventory-container">
        <button onClick={() => navigate("/inventory/add-product")} className="add-button">
          Add New Product
        </button>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingOutlined />
          </div>
        ) : (
          <>
            {products && products.length > 0 ? (
              <>
                <div className="product-list-container">
                  {products.map((product, index) => (
                    <ProductCard key={index} product={product}></ProductCard>
                  ))}
                </div>
                <Pagination total={productCount / limit + 1}></Pagination>
              </>
            ) : (
              <img src={inventory} alt="Empty inventory" className="inventory-image"/>
            )}
          </>
        )}
        <button onClick={() => navigate("/inventory/add-product")} className="add-button">
          Add New Product
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Inventory;
