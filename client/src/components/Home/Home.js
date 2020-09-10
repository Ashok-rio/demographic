import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Input } from "reactstrap";
import "./home.css";
import useCustom from "../../Hooks/UseState";
import Buttons from "../Button/Button";
import data from "../../data";
import PDF from "../Pdf/PdfConvertor";
import API from "../../service/Apiservice";
import Loading from "../Loading/Loading";

const Home = () => {
  const [values, handleChange] = useCustom();
  const [error, setError] = useState({ message: "", show: false });
  const [loading, setLoading] = useState(false);
  const [allDoc, setAllDoc] = useState(true);

  useEffect(() => {
    // setError({ message: "", show: false });
    if (values.district) setAllDoc(false);
    else setAllDoc(true);
  }, [values.district]);

  useEffect(() => {
    const getDistrics = async () => {
      let result;
      try {
        result = await API.getDistrict();
      } catch (err) {
        console.log(err);
      }
      if (result) {
        console.log(result, "district");
      }
    };
    getDistrics();
  }, []);

  const districtOptions = () => {
    return data.map((data, i) => {
      return (
        <option value={data.name} key={i}>
          {data.name}
        </option>
      );
    });
  };

  return (
    <React.Fragment>
      {error.show && (
        <Card
          style={{
            borderRadius: "15px",
            position: "absolute",
            width: "20rem",
            marginBottom: "100px",
            marginLeft: "800px",
          }}
        >
          <CardBody
            style={{
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ color: "red", fontWeight: 600 }}>{error.message}</p>
          </CardBody>
        </Card>
      )}
      <Container className={"homeMainContainer"}>
        {loading && <Loading />}
        <Row style={{ marginTop: "100px" }}>
          <Col lg={6} className={"homeMainColom"}>
            <Card className={"homeCard"}>
              <CardBody>
                <Input
                  type={"select"}
                  placeholder={"district"}
                  value={values.district}
                  name={"district"}
                  onChange={handleChange}
                  style={{ border: "none" }}
                >
                  <option>District</option>
                  {districtOptions()}
                </Input>
              </CardBody>
            </Card>
          </Col>
          <Col lg={6} className={"homeMainColom"}>
            <Card className={"homeCard"}>
              <CardBody>
                <Input
                  type={"select"}
                  placeholder={"gender"}
                  value={values.gender}
                  name={"gender"}
                  onChange={handleChange}
                  style={{ border: "none" }}
                >
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </Input>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className={"buttonRow"}>
          <Col lg={6} className={"buttonColom"}>
            {allDoc ? (
              <PDF
                data={values}
                className={"getButton"}
                loadingFalse={() => setLoading(false)}
                loading={() => setLoading(true)}
                text={"All Documents"}
              />
            ) : (
              <Buttons
                color={"danger"}
                text={"All Document"}
                className={"getButton"}
                click={() => {
                  setError({
                    message: "Please refresh the page !",
                    show: true,
                  });
                  setTimeout(() => setError({ show: false }), 1000);
                }}
              />
            )}
          </Col>
          <Col lg={6} className={"buttonColom"}>
            {values.district || values.gender ? (
              <PDF
                data={values}
                className={"getButton"}
                loadingFalse={() => setLoading(false)}
                loading={() => setLoading(true)}
                text={"Get Documents"}
              />
            ) : (
              <Buttons
                color={"danger"}
                text={"Get Document"}
                className={"getButton"}
                click={() =>
                  setError({ message: "Please select options !", show: true })
                }
              />
            )}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Home;
