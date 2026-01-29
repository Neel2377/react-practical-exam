import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct, updateProduct } from "../features/productSlice";
import "./Addproduct.css";

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editData = useSelector((state) => state.products.editData);

  const [product, setProduct] = useState({});

  useEffect(() => {
    if (editData && editData.id) {
      setProduct(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result });
    };
    reader.readAsDataURL(file);
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
      image: "",
    });

    navigate("/view-product");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card product-card shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-center fw-bold mb-4">
                {product.id ? "Update Product" : "Add Product"}
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Product Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Product Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                {product.image && (
                  <div className="text-center mb-4">
                    <img
                      src={product.image}
                      alt="preview"
                      className="img-preview"
                    />
                  </div>
                )}

                <button className="btn btn-primary w-100">
                  {product.id ? "Update Product" : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
