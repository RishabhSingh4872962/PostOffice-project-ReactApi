import axios from "axios";
import React, { useState } from "react";
import PostOffice from "./PostOffice";
import Spinner from "./Spinner";

const Search = () => {
  const [pincode, setPincode] = useState("");
  const [postOffice, setPostOffice] = useState([]);
  const [filter, setFilter] = useState(false);
  const [fliterValue, setFliterValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [renderPostOffice, setRenderPostOffice] = useState(false);
  async function handlePostoffice() {
    if (pincode.length !== 6) {
        setLoading(false);
        return alert("the code is not 6 digits");
      }
    setLoading(true);
    setRenderPostOffice(true);
    

    try {
      const { data } = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      if (data[0].PostOffice) {
        setPostOffice(data[0].PostOffice);
        setError("");
        setFilter(false);
        setFliterValue("");
      } else {
        setError(data[0]);
      }

      setLoading(false);
    } catch (error) {
      setError("Enter the correct pin code");
    }
  }

  function handleFilter() {
    let id;
    return (e) => {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        if (e.target.value.length > 0) {
          setFliterValue(e.target.value);
          setFilter(true);
        } else {
          setFilter(false);
        }
      }, 500);
    };
  }
  function handleFilterCallBack(post) {
    if (filter) {
      const { Name } = post;
      if (Name.toLowerCase().match(fliterValue)) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {!renderPostOffice && <div>
        <h1>Enter pincode</h1>
        <input
          placeholder="Pincode"
          type="number"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        /><br/>
        <button onClick={handlePostoffice}>Lookup</button>:
      </div>}
      {renderPostOffice &&(   error?.Status === "Error" ? (
        <>
          <p>{error.Status}</p>
          <p>{error.Message}</p>
        </>
      ) : (
        <>
          <h1>Pincode :{pincode}</h1>
          <p>Message :Number of pincode(s) found:{postOffice.length}</p>
          <input type="text" placeholder="Filter" onChange={handleFilter()} />
          <div className="container">
            {postOffice.filter(handleFilterCallBack).map((post, indx) => {
              return <PostOffice key={indx} postOffice={post} />;
            })}
          </div>
        </>
      ))}
    </div>
  );
};

export default Search;
