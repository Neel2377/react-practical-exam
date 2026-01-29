import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct, updateProduct } from "../features/productSlice";

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editData = useSelector((state) => state.products.editData);

  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    if (editData && editData.id) {
      setProduct(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.id) {
      await dispatch(updateProduct(product));
    } else {
      await dispatch(createProduct(product));
    }

    setProduct({
      title: "",
      category: "",
      price: "",
    });
    navigate("/view-product");
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">
            {product.id ? "Update Product" : "Add Product"}
          </h2>

          <label className="form-label">Product Title :</label>
          <input
            className="form-control mb-3"
            name="title"
            value={product.title || ""}
            onChange={handleChange}
            required
          />

          <label className="form-label">Product Category :</label>
          <input
            className="form-control mb-3"
            name="category"
            value={product.category || ""}
            onChange={handleChange}
            required
          />

          <label className="form-label">Product Price :</label>
          <input
            type="number"
            className="form-control mb-3"
            name="price"
            value={product.price || ""}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">
            {product.id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
