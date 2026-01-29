import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllProducts,
  deleteProduct,
  editProduct,
} from "../features/productSlice.js";
import "./Viewproduct.css";

const Viewproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleEdit = (id) => {
    dispatch(editProduct(id));
    navigate("/");
  };

  const filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      if (sort === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-11">
          <div className="card shadow-sm product-table-card">
            <div className="card-body p-4">
              <h3 className="text-center fw-bold mb-4">
                Product List
              </h3>

              {/* Search & Sort */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by product title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="">Sort Products</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="title-asc">Title: A to Z</option>
                    <option value="title-desc">Title: Z to A</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="table align-middle table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProducts.length ? (
                      filteredProducts.map((p, i) => (
                        <tr key={p.id}>
                          <td>{i + 1}</td>
                          <td>{p.title}</td>
                          <td>{p.category}</td>
                          <td>₹ {p.price}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-outline-danger btn-sm me-2"
                              onClick={() => dispatch(deleteProduct(p.id))}
                            >
                              Delete
                            </button>

                            <button
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => handleEdit(p.id)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">
                          No products found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewproduct;
