import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Fuse from "fuse.js";
import SingleProducts from "./SingleProducts";

function App() {
  const [products, setProducts] = useState();
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [productCopy, setProductCopy] = useState();

  useEffect(() => {
    const fetchdata = axios
      .get(
        "https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=20&page=1&minPrice=0&maxPrice=2500&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus"
      )
      .then((res) => {
        try {
          const allData = res.data.data.data;
          setLoading(true);
          setProducts(allData);
          setProductCopy(allData);
          // fetchdata()
        } catch (error) {
          console.log(error.message);
        }
      });
  }, []);
  console.log(products);

  const fuse = new Fuse(products, {
    keys: ["name", "grade"],
  });

  const searchProducts = (pattern) => {
    if (!pattern) {
      setProductCopy(products);
      return (
        <div>
          No result for products...pls review categories to see products
        </div>
      );
    }

    const result = fuse.search(pattern);
    const prorRes = result.map((products) => products.item);
    if ((!result)) {
      // setSearching(false)
      return (
        <div>
          <span className="nos">No result for products...</span>
          <span className="click">pls review categories to see products</span>
        </div>
      );
    }

    setProductCopy(prorRes);
  };

  return (
    <>
      <div className="header">EZE MOBILES</div>
      <div className="w-75 my-0 mx-auto">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <input
              type="search"
              name="search-form"
              id="search-form"
              placeholder="Search"
              value={query}
              onChange={(e) => searchProducts(e.target.value)}
            />
          </div>

          <div className="col-sm-12 col-md-6">
            <input type="number" placeholder="Min"/> to <input type="number" placeholder="Max"/>
          </div>
        </div>

        {
          productCopy?.map((product) => {
            return <SingleProducts key={product.id} product={product} />;
          })
        }
      </div>
    </>
  );
}

export default App;
