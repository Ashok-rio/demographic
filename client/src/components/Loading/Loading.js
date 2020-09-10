import React from "react";
import { Spinner } from 'reactstrap';

const Loading = () => {
  return (
    <div style={{textAlign:"center"}}>
      <Spinner style={{margin:"10px"}} type="grow" color="primary" />
      <Spinner style={{margin:"10px"}} type="grow" color="secondary" />
      <Spinner style={{margin:"10px"}} type="grow" color="success" />
      <Spinner style={{margin:"10px"}} type="grow" color="danger" />
      <Spinner style={{margin:"10px"}} type="grow" color="warning" />
      <Spinner style={{margin:"10px"}} type="grow" color="info" />
      <Spinner style={{margin:"10px"}} type="grow" color="dark" />
    </div>
  );
};

export default Loading;
