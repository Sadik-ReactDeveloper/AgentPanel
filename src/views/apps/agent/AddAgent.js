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
  CustomInput,
} from "reactstrap";
import axiosConfig from "../../../axiosConfig";
import swal from "sweetalert";
import { Route } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../assets/scss/plugins/extensions/editor.scss";
export default class AddAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planname: {},
      plannameList: [],
      short_desc: "",
      title: "",
      long_desc: "",
      highlight_desc: "",
      upload_pdf: "",
      selectedFile: null,
      plan_max: "",
      plan_deductible: "", //  number
      coverageAmt: "", //  number
      start_date: "", //  str
      end_date: "",
      total: "", //  number
      email: "",
      coverage_area: "", //  str
      dob: "",
    };
  }
  onEditorStateChange = (editorState) => {
    // console.log(editorState);
    this.setState({
      editorState,
      short_desc: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };

  changeHandler = (e) => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleImage = (e) => {
    console.log(e.target.files[0]);
    this.setState({ selectedFile: e.target.files[0] });
  };
  changeHandler1 = (e) => {
    console.log(e.target.value);
    this.setState({ allPlan: e.target.value });
  };

  componentDidMount() {
    this.getOptionDataList();
  }

  getOptionDataList = () => {
    axiosConfig.get(`/user/infPlanList`).then((response) => {
      console.log(response.data);
      this.setState({ plannameList: response.data });
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("planname", this.state.allPlan);
    formData.append("short_desc", this.state.short_desc);
    formData.append("title", this.state.title);
    // formData.append("long_desc", "long_desc");
    // formData.append("highlight_desc", "highlight_desc");
    formData.append("plan_max", this.state.plan_max);
    formData.append("plan_deductible", Number(this.state.plan_deductible));
    formData.append("coverageAmt", Number(this.state.coverageAmt));
    formData.append("start_date", this.state.start_date);
    formData.append("end_date", this.state.end_date);
    formData.append("total", Number(this.state.total));
    formData.append("email", this.state.email);
    formData.append("coverage_area", this.state.coverage_area);
    formData.append("dob", this.state.dob);

    if (this.state.selectedFile != null) {
      formData.append("upload_pdf", this.state.selectedFile);
    }
    axiosConfig
      .post("/user/createBmiPlan", formData)
      .then((response) => {
        console.log(response.data);
        swal("Success!", "Submitted SuccessFull!", "success");
      })
      .catch((error) => {
        console.log(error);
      });
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
                <BreadcrumbItem href="/app/plans/CreatedPlanList" tag="a">
                  AgentList
                </BreadcrumbItem>
                <BreadcrumbItem active> Add Agent</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </Col>
        </Row>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Add Agent
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() => history.push("/app/agent/AgentList")}
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
                  <Label>Agent Name</Label>
                  <Input
                    required
                    type="text"
                    name="title"
                    placeholder="AgentName"
                    value={this.state.title}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Address</Label>
                  <Input
                    required
                    type="text"
                    name="Address"
                    placeholder="Address"
                    value={this.state.Address}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>City</Label>
                  <Input
                    required
                    type="text"
                    name="City"
                    placeholder="City"
                    value={this.state.Address}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>State</Label>
                  <Input
                    required
                    type="text"
                    name="State"
                    placeholder="State"
                    value={this.state.Address}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Zipcode</Label>
                  <Input
                    required
                    type="text"
                    name="Zipcode"
                    placeholder="Zipcode"
                    value={this.state.Address}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>

                {/* <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="plan_max"
                    placeholder="Last Name"
                    value={this.state.plan_max}
                    onChange={this.changeHandler}
                  />
                </Col> */}
                {/* <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Adhar Image</Label>
                  <Input
                    className="form-control"
                    type="file"
                    name="upload_pdf"
                    onChange={this.handleImage}
                  />
                </Col> */}
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Mobile</Label>
                  <Input
                    type="number"
                    name="plan_deductible"
                    placeholder="Enter Mobile"
                    value={this.state.plan_deductible}
                    onChange={this.changeHandler}
                  />
                </Col>

                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.changeHandler}
                  />
                </Col>
                {/* <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.changeHandler}
                  />
                </Col> */}
                {/* <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>DOB</Label>
                  <Input
                    type="date"
                    name="dob"
                    value={this.state.dob}
                    onChange={this.changeHandler}
                  />
                </Col> */}
              </Row>
              <Row className="m-1">
                <Col lg="6" md="6" sm="6" className="mt-1">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  >
                    Add Agent
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
