/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Form,
  Label,
  Input,
  CustomInput,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import axiosConfig from "../../../../axiosConfig";
// import { history } from "../../../../history";
import swal from "sweetalert";
import { Route } from "react-router-dom";

export default class PnLViewSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: "",
      userName: "",
      email: "",
      selectedName: "",
      selectedFile: null,
      userMobile: "",
      fullName: "",
    };
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/admin/getonePnlSheet/${id}`)
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          //   title: response.data.data.title,
          //   desc: response.data.data.desc,
          image: response.data.data.pnlimg[0],
          userMobile: response.data.data.userId?.mobile,
          fullName:
            response.data.data.userId?.firstname +
            response.data.data.userId?.lastname,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
                <BreadcrumbItem href="/app/explore/Trupee/opportunity" tag="a">
                  View Feedback
                </BreadcrumbItem>
                <BreadcrumbItem active>View Feedback</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </Col>
        </Row>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                View PnLSheet
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() => history.push("/app/trade/pnLSheetList")}
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
                <Col lg="4" md="6" sm="6" className="mb-2">
                  <Label>UserName</Label>
                  <Input
                    required
                    type="text"
                    disabled
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="4" md="6" sm="6" className="mb-2">
                  <Label>Mobile</Label>
                  <Input
                    type="text"
                    disabled
                    name="userMobile"
                    value={this.state.userMobile}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="4" md="6" sm="6" className="mb-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    disabled
                    name="email"
                    value={this.state.email}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="12" md="12" sm="6" className="mb-2">
                  <img
                    src={this.state.image}
                    alt="no image"
                    // width="100%"
                    // height="100%"
                  />
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
