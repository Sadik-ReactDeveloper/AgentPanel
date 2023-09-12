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
export default class EditPlanDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planname: "",
      plannameList: [],
      short_desc: "",
      title: "",
      long_desc: "",
      highlight_desc: "",
      upload_pdf: [],
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
      allPlan: "",
      PlanDetailsView: [],
    };
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      short_desc: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleImage = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };
  changeHandler1 = (e) => {
    this.setState({ allPlan: e.target.value });
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    await axiosConfig.get(`/admin/getOnePlan/${id}`).then((response) => {
      const {
        planname,
        title,
        short_desc,
        coverageAmt,
        coverage_area,
        dob,
        email,
        end_date,
        highlight_desc,
        plan_deductible,
        plan_max,
        start_date,
        total,
      } = response.data.data.Plan;
      this.setState({
        allPlan: planname._id,
        title: title,
        short_desc: short_desc,
        coverageAmt: coverageAmt,
        coverage_area: coverage_area,
        dob: dob,
        email: email,
        end_date: end_date,
        highlight_desc: highlight_desc,
        plan_deductible: plan_deductible,
        plan_max: plan_max,
        start_date: start_date,
        total: total,
      });
      // this.setState({ title: title });
      // this.setState({ short_desc: short_desc });
      // this.setState({ coverageAmt: coverageAmt });
      // this.setState({ coverage_area: coverage_area });
      // this.setState({ dob: dob });
      // this.setState({ email: email });
      // this.setState({ end_date: end_date });
      // this.setState({ highlight_desc: highlight_desc });
      // this.setState({ plan_deductible: plan_deductible });
      // this.setState({ plan_max: plan_max });
      // this.setState({ start_date: start_date });
      // this.setState({ total: total });
    });

    await axiosConfig.get(`/user/infPlanList`).then((response) => {
      this.setState({ plannameList: response.data });
    });
  }

  submitHandler = (e) => {
    const { id } = this.props.match.params;
    e.preventDefault();
    const formData = new FormData();
    formData.append("planname", this.state.allPlan);
    formData.append("short_desc", this.state.short_desc);
    formData.append("title", this.state.title);
    // formData.append("long_desc", "long_desc");
    // formData.append("highlight_desc", "highlight_desc");
    formData.append("plan_max", Number(this.state.plan_max));
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
      .post(`/admin/editPlanDetail/${id}`, formData)
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
                  Plan DetailList
                </BreadcrumbItem>
                <BreadcrumbItem active> EditPlan Detail</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </Col>
        </Row>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                EditPlan Detail
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() => history.push("/app/plans/PlanDetailList")}
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
                  <Label>Plan Name</Label>
                  <CustomInput
                    type="select"
                    name="allPlan"
                    value={this.state.allPlan}
                    onChange={this.changeHandler1}
                  >
                    {this.state.plannameList &&
                      this.state.plannameList?.map((allName) => (
                        <option
                          selected={this.state.allPlan}
                          value={allName?._id}
                          key={allName?._id}
                        >
                          {allName?.planName}
                        </option>
                      ))}
                  </CustomInput>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Title</Label>
                  <Input
                    required
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>

                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Upload Pdf</Label>
                  <Input
                    className="form-control"
                    type="file"
                    name="upload_pdf"
                    // value={this.state.upload_pdf}
                    onChange={this.handleImage}
                  />
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Plan Max</Label>
                  <Input
                    type="text"
                    name="plan_max"
                    placeholder="Plan Max"
                    value={this.state.plan_max}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Plan Deductible</Label>
                  <Input
                    type="number"
                    name="plan_deductible"
                    placeholder="Plan Deductible"
                    value={this.state.plan_deductible}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>CoverageAmt</Label>
                  <Input
                    type="number"
                    name="coverageAmt"
                    placeholder="CoverageAmt"
                    value={this.state.coverageAmt}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    name="start_date"
                    value={this.state.start_date}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    name="end_date"
                    value={this.state.end_date}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Total</Label>
                  <Input
                    type="number"
                    name="total"
                    placeholder="Total"
                    value={this.state.total}
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
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Coverage Area</Label>
                  <Input
                    type="text"
                    name="coverage_area"
                    placeholder="Coverage Area"
                    value={this.state.coverage_area}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>DOB</Label>
                  <Input
                    type="date"
                    name="dob"
                    value={this.state.dob}
                    onChange={this.changeHandler}
                  />
                </Col>
                <Col lg="4" md="6" sm="6" className="mb-2">
                  <Label>Descripition</Label>
                  <Editor
                    toolbarClassName="demo-toolbar-absolute"
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "fontFamily",
                      ],
                      inline: {
                        options: [
                          "bold",
                          "italic",
                          "underline",
                          "strikethrough",
                          "monospace",
                        ],
                        bold: { className: "bordered-option-classname" },
                        italic: { className: "bordered-option-classname" },
                        underline: { className: "bordered-option-classname" },
                        strikethrough: {
                          className: "bordered-option-classname",
                        },
                        code: { className: "bordered-option-classname" },
                      },
                      blockType: {
                        className: "bordered-option-classname",
                      },
                      fontSize: {
                        className: "bordered-option-classname",
                      },
                      fontFamily: {
                        className: "bordered-option-classname",
                      },
                    }}
                  />
                </Col>
                {/* <Col lg="4" md="6" sm="6" className="mb-2">
                  <Label>Long Descripition</Label>
                  <Editor
                    toolbarClassName="demo-toolbar-absolute"
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "fontFamily",
                      ],
                      inline: {
                        options: [
                          "bold",
                          "italic",
                          "underline",
                          "strikethrough",
                          "monospace",
                        ],
                        bold: { className: "bordered-option-classname" },
                        italic: { className: "bordered-option-classname" },
                        underline: { className: "bordered-option-classname" },
                        strikethrough: {
                          className: "bordered-option-classname",
                        },
                        code: { className: "bordered-option-classname" },
                      },
                      blockType: {
                        className: "bordered-option-classname",
                      },
                      fontSize: {
                        className: "bordered-option-classname",
                      },
                      fontFamily: {
                        className: "bordered-option-classname",
                      },
                    }}
                  />
                </Col>
                <Col lg="4" md="6" sm="6" className="mb-2">
                  <Label>Highlight Descripition</Label>
                  <Editor
                    toolbarClassName="demo-toolbar-absolute"
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "fontFamily",
                      ],
                      inline: {
                        options: [
                          "bold",
                          "italic",
                          "underline",
                          "strikethrough",
                          "monospace",
                        ],
                        bold: { className: "bordered-option-classname" },
                        italic: { className: "bordered-option-classname" },
                        underline: { className: "bordered-option-classname" },
                        strikethrough: {
                          className: "bordered-option-classname",
                        },
                        code: { className: "bordered-option-classname" },
                      },
                      blockType: {
                        className: "bordered-option-classname",
                      },
                      fontSize: {
                        className: "bordered-option-classname",
                      },
                      fontFamily: {
                        className: "bordered-option-classname",
                      },
                    }}
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
                    AddPlanDetail
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
