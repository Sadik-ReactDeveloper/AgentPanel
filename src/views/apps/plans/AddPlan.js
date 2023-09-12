import React, { Component } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import axiosConfig from "../../../axiosConfig";
import { history } from "../../../history";
import swal from "sweetalert";
import { Route } from "react-router-dom";

export default class AddFnoOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptName: "",
      status: "",
    };
  }
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    // e.preventDefault();
    // axiosConfig
    //   .post("/admin/addEquityScript", this.state)
    //   .then((response) => {
    //     this.setState({ scriptName: "" });
    //     swal("Success!", "Submitted SuccessFull!", "success");
    //     // this.props.history.push("/app/scripts/fnoOption");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <div>
              <Breadcrumb listTag="div">
                <BreadcrumbItem href="/analyticsDashboard" tag="a">
                  Home
                </BreadcrumbItem>
                <BreadcrumbItem href="/app/scripts/fnoOption" tag="a">
                  FNO Option List
                </BreadcrumbItem>
                <BreadcrumbItem active>Add FNO Option</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </Col>
        </Row>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Add Plan
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() => history.push("/app/plans/PlanList")}
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Start Date</Label>
                  <Input
                    required
                    type="date"
                    name="scriptName"
                    min="2023-04-06"
                    max="2099-12-31"
                    // placeholder="Script Name"
                    value={this.state.scriptName}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>End Date</Label>
                  <Input
                    required
                    type="date"
                    name="scriptName"
                    value={this.state.scriptName}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>

                <Col lg="6" md="6" className="mb-2">
                  <Label for="exampleSelect">Coverage Area</Label>
                  <Input
                    id="exampleSelect"
                    name="script_type"
                    type="select"
                    // value={this.state.script_type}
                    // onChange={this.changeHandler}
                  >
                    {/* <option>Area</option> */}

                    <option>USA/CANADA/WorldWide</option>
                    <option>WorldWide/Travel</option>
                  </Input>
                </Col>
                <Col lg="6" md="6" className="mb-2">
                  <Label for="exampleSelect">Maximum</Label>
                  <Input
                    id="exampleSelect"
                    name="script_type"
                    type="select"
                    // value={this.state.script_type}
                    // onChange={this.changeHandler}
                  >
                    <option>Below $5,000,000</option>
                    <option>Below $8,000,000</option>
                  </Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>DOB</Label>
                  <Input
                    required
                    type="number"
                    // name="scriptName"
                    placeholder="Enter Number "
                    // value={this.state.scriptName}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
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
              </Row>
              <Row>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  >
                    Add Plan
                  </Button.Ripple>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
