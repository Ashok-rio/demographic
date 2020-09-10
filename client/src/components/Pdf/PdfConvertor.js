import React from "react";
import { Button } from 'reactstrap';
import jsPDF from "jspdf";
import "jspdf-autotable";
import API from "../../service/Apiservice";


const  Pdf = (props) => {

  const getdatas = async () => {
    let response;
    let datas = props.data || {};
    props.loading();
    try {
      response = await API.getData(datas);
      await exportPDF(response.data.data,response.data.district)
    } catch (err) {
      console.error(err);
    }
  };

  const splitContent = (sample,city,doc,headers) => {
    console.log(sample,city)
    city.map((x) => {
      let splitedArray = [];
      sample.map((y) => {
        if (x === y[5]) {
           splitedArray.push(y);
        }
        return null;
      });
      return doc.autoTable({
        theme: "striped",
        bodyStyles: { fontSize: 8, fontStyle: "bold" },
        head: headers,
        body: splitedArray,
      });
    });
  };

  const exportPDF = (data,city) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const headers = [
      ["NAME", "PHONE", "AGE", "GENDER", "AREA", "DISTRICT", "STATE"],
    ];
    doc.text("Demographic Analysis",40,30);
    splitContent(data,city,doc,headers);

    doc.save("report.pdf");
    props.loadingFalse();
    // doc.output("dataurlnewwindow");
  };
  return <Button color={'success'}  className={props.className} onClick={getdatas}>{props.text}</Button>
}

export default Pdf;
