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
export class AddEquityCash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      script_type: "",
      scriptName: "",
      active_value: "",
      active_value2: "",
      call_type: "",
      SL: "",
      sl_type: false,
      T1: "",
      t1_type: false,
      T2: "",
      t2_type: false,
      T3: "",
      t3_type: false,
      T4: "",
      t4_type: false,
      t5: "",
      t5_type: false,
      qty: "",
      // investment_amt: null,
      // no_of_lots: "",
      pl_type: "",
      profit_loss_amt: "",
      expiryDate: "",
      // cstmMsg: "",
      updateexpiryDate: "",
    };
    this.state = {
      type: "",
      scriptN: [],
      expdateI: [],
    };
  }
  componentDidMount() {
    //Script//

    axiosConfig
      .get("/admin/getCashScript")
      .then((response) => {
        console.log(response.data.data);
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
        console.log(response.data.data[0]._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  changeHandler1 = (e) => {
    this.setState({ allScript: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let obj = {
      script_type: this.state.script_type,
      cash_scrpt_name: this.state.allScript,
      active_value: this.state.active_value,
      active_value2: this.state.active_value2,
      call_type: this.state.call_type,
      SL: this.state.SL,
      sl_type: false,
      T1: this.state.T1,
      t1_type: false,
      T2: this.state.T2,
      t2_type: false,
      T3: this.state.T3,
      t3_type: false,
      T4: this.state.T4,
      t4_type: false,
      // t5: "",
      t5_type: false,
      qty: this.state.qty,
      // investment_amt: this.state.investment_amt,
      // no_of_lots: this.state.no_of_lots.toString(),
      // pl_type: this.state.pl_type,
      // profit_loss_amt: this.state.profit_loss_amt,
      // expiryDate: this.state.expdateI,
      type: "Cash",
      // cstmMsg: this.state.cstmMsg,
    };
    console.log(obj);
    axiosConfig
      .post("/admin/add_equityCash", obj)
      .then((response) => {
        console.log(response.data.data);
        swal("Success!", "Submitted SuccessFull!", "success");
        this.props.history.push("/app/trade/equityCashList");
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
                Add Equity Cash
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() => history.push("/app/trade/equityCashList")}
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
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Script Name*</Label>
                  <CustomInput
                    type="select"
                    name="cash_scrpt_name"
                    // valid={true}
                    // invalid={true}
                    value={this.state.cash_scrpt_name}
                    onChange={this.changeHandler1}
                  >
                    <option>Select Script</option>
                    {this.state.scriptN?.map((allScript) => (
                      <option value={allScript?._id} key={allScript?._id}>
                        {allScript?.scriptName}
                      </option>
                    ))}
                  </CustomInput>
                </Col>
                {/* <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Expiry Date</Label>
                  <CustomInput
                    type="select"
                    name="expiryDate"
                    value={this.state.expdateI}
                    onChange={this.changeHandler}
                  >
                    <option>Expiry Date</option>
                    {this.state.expdateI?.map((allExpDate) => (
                      <>
                       
                        <option value={allExpDate?._id} key={allExpDate?._id}>
                          {allExpDate?.expDate}
                        </option>
                      </>
                    ))}
                  </CustomInput>
                </Col> */}
                <Col lg="6" md="6" className="mb-2">
                  <Label for="exampleSelect">Equity Script</Label>
                  <Input
                    id="exampleSelect"
                    name="script_type"
                    type="select"
                    required
                    // valid={true}
                    value={this.state.script_type}
                    onChange={this.changeHandler}
                  >
                    <option>Select Script</option>
                    <option>BUY</option>
                    <option>SELL</option>
                  </Input>
                </Col>
                <Col lg="6" md="6" className="mb-2">
                  <Label for="exampleSelect">Call Type*</Label>
                  <Input
                    id="exampleSelect"
                    name="call_type"
                    type="select"
                    required
                    resource=""
                    value={this.state.call_type}
                    onChange={this.changeHandler}
                  >
                    <option>Select Call Type</option>
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
                {/* <Col lg="6" md="6" className="mb-2">
                  <div>
                    <Label>P&L</Label>
                    <Input
                      type="select"
                      name="pl_type"
                      value={this.state.pl_type}
                      onChange={this.changeHandler}
                    >
                      <option value="Option 1">Select Option</option>
                      <option value="Option 2">Profit</option>
                      <option value="Option 3">Loss</option>
                    </Input>
                    <Input
                      type="number"
                      name="profit_loss_amt"
                      value={this.state.profit_loss_amt}
                      onChange={this.changeHandler}
                    />
                  </div>
                </Col> */}
                <Col lg="6" md="6" className="mb-2">
                  <Label>Active Value*</Label>
                  <Input
                    type="number"
                    placeholder="Enter Active Value"
                    name="active_value"
                    required
                    value={this.state.active_value}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-2">
                  <Label>Range Value*</Label>
                  <Input
                    type="number"
                    placeholder="Enter Max. Value Price"
                    name="active_value2"
                    required
                    value={this.state.active_value2}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-2">
                  <Label>SL*</Label>
                  <Input
                    name="SL"
                    type="number"
                    required
                    placeholder="Enter Stop Loss"
                    value={this.state.SL}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-2">
                  <Label>T₹ 1* </Label>
                  <Input
                    type="number"
                    required
                    placeholder="Enter Target 1"
                    name="T1"
                    value={this.state.T1}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" className="mb-2">
                  <Label>T₹ 2</Label>
                  <Input
                    type="number"
                    placeholder="Enter Target 2"
                    name="T2"
                    value={this.state.T2}
                    onChange={this.changeHandler}
                  />
                </Col>{" "}
                <Col lg="6" md="6" className="mb-2">
                  <Label>T₹ 3</Label>
                  <Input
                    type="number"
                    placeholder="Enter Target 3"
                    name="T3"
                    value={this.state.T3}
                    onChange={this.changeHandler}
                  />
                </Col>{" "}
                <Col lg="6" md="6" className="mb-2">
                  <Label>T₹ 4</Label>
                  <Input
                    type="number"
                    placeholder="Enter Target 4"
                    name="T4"
                    value={this.state.T4}
                    onChange={this.changeHandler}
                  />
                </Col>{" "}
                <Col lg="6" md="6" className="mb-2">
                  <Label>Quantity*</Label>
                  <Input
                    type="number"
                    name="qty"
                    required
                    placeholder="Enter Quantity"
                    value={this.state.qty}
                    onChange={this.changeHandler}
                  />
                </Col>
                {/* <Col lg="6" md="6" className="mb-2">
                  <Label>Investment Amount</Label>
                  <Input
                    name="investment_amt"
                    type="number"
                    placeholder="Enter Investment Amount"
                    value={this.state.investment_amt}
                    onChange={this.changeHandler}
                  />
                </Col> */}
                {/* <Col lg="6" md="6" className="mb-2">
                  <Label>Per Lot Price</Label>
                  <Input
                    type="number"
                    name="no_of_lots"
                    placeholder="Enter Per Lot Price"
                    value={this.state.no_of_lots}
                    onChange={this.changeHandler}
                  />
                </Col> */}
                {/* <Col lg="6" md="6" className="mb-2">
                  <Label>Achieved Target+</Label>
                  <Input
                    type="text"
                    placeholder="Enter Target 5"
                    name="t5"
                    value={this.state.t5}
                    onChange={this.changeHandler}
                  />
                </Col> */}
                {/* <Col lg="6" md="6" className="mb-2">
                  <Label>Type</Label>
                  <Input
                    type="select"
                    name="type"
                    placeholder="Enter Type "
                    value={this.state.type}
                    onChange={this.changeHandler}
                  >
                    <option>Select type</option>
                    <option>Cash</option>
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
                  /> */}
                {/* <span>
                    <b> We will type 210+ Keep booking or trailing stop loss</b>
                  </span> */}
                {/* </Col> */}
              </Row>
              <Row>
                <Button.Ripple
                  className="mr-1 mb-1"
                  type="submit"
                  color="primary"
                >
                  Add Equity Cash
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default AddEquityCash;
