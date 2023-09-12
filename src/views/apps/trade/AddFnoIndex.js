import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
  CustomInput,
} from "reactstrap";
import { Route } from "react-router-dom";
import swal from "sweetalert";
import axiosConfig from "../../../axiosConfig";

export class AddFnoIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiryDate: "",
      script_type: "",
      fnoindex_scrpt_name: "",
      active_value: "",
      call_type: "",
      qty: "",
      investment_amt: "",
      no_of_lots: "",
      trade_type: "",
      t5: "",
      status: "",
      // cstmMsg: "",
    };
    this.state = {
      type: "Index",
      scriptN: [],
      expdateI: [],
    };
  }

  componentDidMount() {
    axiosConfig
      .get("/admin/getFnoScript")
      .then((response) => {
        console.log(response);
        this.setState({
          scriptN: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // expDate//
    axiosConfig
      .get("/admin/datelist")
      .then((response) => {
        this.setState({
          expdateI: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    console.log("type", this.state);
    axiosConfig
      .post("/admin/add_fnoIndex", this.state)
      .then((response) => {
        console.log("add Data", response.data);
        swal("Success!", "Submitted SuccessFull!", "success");
        this.props.history.push("/app/trade/fnoIndexList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Add FNO Index
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() => history.push("/app/trade/fnoIndexList")}
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row className="mb-2">
                {/* <Col lg="6" md="6" className="mb-2">
                  <Label>Exp. Date</Label>
                  <Input
                    type="date"
                    name="expiryDate"
                    value={this.state.expiryDate}
                    onChange={this.changeHandler}
                  />
                </Col> */}

                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Script Name</Label>
                  <CustomInput
                    type="select"
                    name="fnoindex_scrpt_name"
                    // valid={this.state.fnoindex_scrpt_name ? true : false}
                    // invalid={this.state.fnoindex_scrpt_name ? false : true}
                    value={this.state.fnoindex_scrpt_name}
                    onChange={this.changeHandler}
                  >
                    <option>Select Script</option>
                    {this.state.scriptN?.map((allScript) => (
                      <option value={allScript?._id} key={allScript?._id}>
                        {allScript?.scriptName}
                      </option>
                    ))}
                  </CustomInput>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Expiry Date</Label>
                  <CustomInput
                    type="select"
                    name="expiryDate"
                    // valid={this.state.expiryDate ? true : false}
                    // invalid={this.state.expiryDate ? false : true}
                    value={this.state.expiryDate}
                    onChange={this.changeHandler}
                  >
                    <option>Expiry Date</option>
                    {this.state.expdateI?.map((allExpDate) => (
                      <option value={allExpDate?._id} key={allExpDate?._id}>
                        {allExpDate?.expDate}
                      </option>
                    ))}
                  </CustomInput>
                </Col>
                <Col lg="6" md="6" className="mb-2">
                  <Label for="exampleSelect">Equity Script</Label>
                  <Input
                    // id="exampleSelect"
                    name="script_type"
                    type="select"
                    value={this.state.script_type}
                    onChange={this.changeHandler}
                    // valid={this.state.script_type ? true : false}
                    // invalid={this.state.script_type ? false : true}
                  >
                    <option>Select Script</option>
                    <option>BUY</option>
                    <option>SELL</option>
                  </Input>
                </Col>
                <Col lg="6" md="6" className="mb-2">
                  <Label for="exampleSelect">Trade Type</Label>
                  <Input
                    id="exampleSelect"
                    name="trade_type"
                    type="select"
                    value={this.state.trade_type}
                    onChange={this.changeHandler}
                    // valid={this.state.trade_type ? true : false}
                    // invalid={this.state.trade_type ? false : true}
                  >
                    <option>Select Trade</option>
                    <option value="BankNifty">BANK NIFTY</option>
                    <option value="Nifty">NIFTY</option>
                  </Input>
                </Col>

                <Col lg="6" md="6" className="mb-2">
                  <Label for="exampleSelect">Call Type</Label>
                  <Input
                    id="exampleSelect"
                    name="call_type"
                    type="select"
                    value={this.state.call_type}
                    onChange={this.changeHandler}
                    placeholder="Select Call Type"
                    // valid={this.state.call_type ? true : false}
                    // invalid={this.state.call_type ? false : true}
                  >
                    {/* <option>Select Call Type</option> */}
                    <option>Intraday</option>
                    <option>BTST</option>
                    <option>Short Term</option>
                    <option>Intraday or BTST</option>
                    <option>Intraday (Risky)</option>
                    <option>Intraday (Trailed)</option>
                    <option>Intraday (Re-entry)</option>
                    <option>Intraday (Re-entry- Trailed)</option>
                    <option>Intraday (Hero-Zero)</option>
                  </Input>
                </Col>

                <Col lg="6" md="6" className="mb-2">
                  <Label>Active Value*</Label>
                  <Input
                    type="number"
                    required
                    placeholder="Enter Active Value"
                    name="active_value"
                    value={this.state.active_value}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-2">
                  <Label>Range value*</Label>
                  <Input
                    name="t5"
                    type="number"
                    required
                    placeholder="Enter T5 "
                    value={this.state.t5}
                    onChange={this.changeHandler}
                  />
                </Col>
                {/* <Col lg="6" md="6" className="mb-2">
                  <Label>Tiral</Label>
                  <Input
                    name="trl"
                    type="text"
                    placeholder="Enter Tiral "
                    value={this.state.t5}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-2">
                  <Label>T1</Label>
                  <Input
                    name="FT1"
                    type="text"
                    placeholder="Enter T1 "
                    value={this.state.FT1}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-2">
                  <Label>T2</Label>
                  <Input
                    name="FT1"
                    type="text"
                    placeholder="Enter T2 "
                    value={this.state.FT2}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-2">
                  <Label>T3</Label>
                  <Input
                    name="FT3"
                    type="text"
                    placeholder="Enter T3 "
                    value={this.state.FT3}
                    onChange={this.changeHandler}
                  />
                </Col> */}
                {/* <Col lg="6" md="6" className="mb-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    name="qty"
                    placeholder="Enter Quantity"
                    value={this.state.qty}
                    onChange={this.changeHandler}
                  />
                </Col> */}
                <Col lg="6" md="6" className="mb-2">
                  <Label>Number Of Lots</Label>
                  <Input
                    type="number"
                    name="no_of_lots"
                    placeholder="Enter Lots Price"
                    value={this.state.no_of_lots}
                    onChange={this.changeHandler}
                  />
                </Col>

                {/* <Col lg="6" md="6" className="mb-2">
                  <Label> Type </Label>
                  <Input
                    type="select"
                    name="type"
                    placeholder="Enter Trade Type"
                    value={this.state.type}
                    onChange={this.changeHandler}
                  >
                    <option>Select type</option>
                    <option>Index</option>
                  </Input>
                </Col> */}
                {/* <Col lg="6" md="6" className="mb-2">
                  <Label>Trade Alert</Label>
                  <Input
                    type="text"
                    placeholder="Keep booking or trailing stop loss"
                    name="cstmMsg"
                    value={this.state.cstmMsg}
                    onChange={this.changeHandler}
                  />
                </Col> */}
                {/* <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label className="mb-1">Status</Label>
                  <div
                    className="form-label-group"
                    onChange={(e) => this.changeHandler1(e)}
                  >
                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Active"
                    />
                    <span style={{ marginRight: "20px" }}>Active</span>

                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Inactive"
                    />
                    <span style={{ marginRight: "3px" }}>Inactive</span>
                  </div>
                </Col> */}
                {/* <span>
                    <b> We will type 210+ Keep booking or trailing stop loss</b>
                  </span> */}
              </Row>
              <Row>
                <Button.Ripple
                  className="mr-1 mb-1"
                  type="submit"
                  color="primary"
                >
                  Add FNO Index
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default AddFnoIndex;
