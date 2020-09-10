import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Pdf from "../components/Pdf/PdfConvertor";
import API from "../service/Apiservice";

const Routes = () => {
  const [doc, setDoc] = useState(false);
  setTimeout(async () => {
    let response;
    try {
      response = await API.autoPost();
      if (response.success) {
        setDoc(true);
      } else {
        setDoc(true);
      }
    } catch (error) {
      console.error(error);
    }
  },1000)
  return (
    <Router>
      <Route exact path={"/"} component={Home} />
      {doc && <Route path={"/pdf"} component={Pdf} />}
    </Router>
  );
};

export default Routes;
