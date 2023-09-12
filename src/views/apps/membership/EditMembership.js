import React, { Component } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  Label,
  FormGroup,
  Input,
  CustomInput,
  Button,
} from "reactstrap";
import swal from "sweetalert";
import axiosConfig from "../../../axiosConfig";

import { Route } from "react-router-dom";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

export default class EditMembership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      dob: "",
      pack_name: "",
      expdate: "",
      status: "",
      firstnameU: [],
      mobileU: [],
      emailU: "",
      lastnameU: [],
      dobU: [],
      genderU: "",
      pack_nameM: [],
      membership: "",
      startDate: "",
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/admin/viewonemembership/${id}`)
      .then((response) => {
        console.log("OneMember", response.data);
        this.setState({ getdetail: response.data.getdetail });
        this.setState({
          firstnameU: response.data.getdetail.userid.firstname,
          mobileU: response.data.getdetail.userid.mobile,
          emailU: response.data.getdetail.userid.email,
          lastnameU: response.data.data,
          dobU: response.data.data,
          gender: response.data.getdetail.userid.gender,
          expdate: response.data.getdetail.userid.expdate,
          dob: response.data.getdetail.userid.dob,
          startDate: response.data.getdetail.userid.start_date,
          membership: response.data.getdetail.userid.pack_name,
          status: response.data.getdetail.userid.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeHandler1 = (e) => {
    console.log(e.target.value);
    this.setState({ status: e.target.value });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let { id } = this.props.match.params;
    axiosConfig
      .post(`/admin/updatemembership/${id}`, this.state)
      .then((response) => {
        console.log(response.data.data);
        swal("Success!", "Submitted SuccessFull!", "success");
        // this.props.history.push(`/app/membership/MembershipList`);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle=" Edit Membership"
          breadCrumbParent="Membership"
          breadCrumbActive=" Edit Membership"
        />
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Edit Membership
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/membership/MembershipList")
                    }
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
                {/* <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>User Name</Label>
                  <Input
                    type="text"
                    name="firstnameU"
                    placeholder="User Name"
                    value={this.state.firstnameU}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>

                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Mobile</Label>
                  <Input
                    type="number"
                    placeholder="Mobile"
                    name="mobileU"
                    value={this.state.mobileU}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Email Id</Label>
                  <Input
                    type="email"
                    name="emailU"
                    placeholder="Email"
                    value={this.state.emailU}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Gender</Label>
                  <Input
                    type="select"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.changeHandler}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Date Of Birth</Label>
                  <Input
                    type="dd/mm/yyyy"
                    name="dob"
                    value={this.state.dob}
                    placeholder="dd/mm/yyyy"
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Membership Plan</Label>
                  <CustomInput
                    type="select"
                    name="membership"
                    value={this.state.membership}
                    onChange={this.changeHandler}
                  >
                    {this.state.pack_nameM?.map((planmemship) => (
                      <option value={planmemship?._id} key={planmemship?._id}>
                        {planmemship?.pack_name}
                      </option>
                    ))}
                  </CustomInput>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Start Date</Label>
                  <Input
                    // type="date"
                    type="dd/mm/yyyy"
                    name="startDate"
                    placeholder="dd/mm/yyyy"
                    value={this.state.startDate}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Expiry Date</Label>
                  <Input
                    // type="date"
                    type="dd/mm/yyyy"
                    name="expdate"
                    placeholder="dd/mm/yyyy"
                    value={this.state.expdate}
                    onChange={this.changeHandler}
                  ></Input>
                </Col> */}
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
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
                        // checked="checked"
                      />
                      <span style={{ marginRight: "20px" }}>Active</span>
                      <input
                        style={{ marginRight: "3px" }}
                        type="radio"
                        name="status"
                        value="Deactive"
                      />

                      <span style={{ marginRight: "3px" }}>Deactive</span>
                    </div>
                  </Col>
                </Col>
              </Row>

              <Row>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  >
                    Update
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
