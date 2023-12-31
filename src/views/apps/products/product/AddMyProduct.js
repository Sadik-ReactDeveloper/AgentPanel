import React from "react";
import Wizard from "./ProFormComponent";
import {
  // Form,
  FormGroup,
  Input,
  Label,
  CustomInput,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Button,
} from "reactstrap";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import axiosConfig from "../../../../axiosConfig";
import { history } from "../../../../history";
import { RichUtils } from "draft-js";

class AddMyProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product_name: "",
      sku_no: "",
      hsn_sac_no: "",
      short_desc: "",
      long_desc: "",
      productcategory: "",
      productsubcategory: "",
      unit: "",
      gst: "",
      material: "",
      stock_qty: "",
      size: "",
      colour: "",
      brand: "",
      product_img: "",
      status: "",
      sortorder: "",
      selectedFile: undefined,
      selectedName: "",
    };
    this.state = {
      pBrand: [],
      productC: [],
      productSC: [],
      units: [],
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  async componentDidMount() {
    //Product Category
    axiosConfig
      .get("/getproductCategory")
      .then((response) => {
        console.log(response);
        this.setState({ productC: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });

    //Product Sub Category
    axiosConfig
      .get("/getproductsubcategory")
      .then((response) => {
        console.log(response);
        this.setState({ productSC: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });

    //Units
    axiosConfig
      .get("/viewallunits")
      .then((response) => {
        console.log(response);
        this.setState({ units: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
    //Brand
    axiosConfig
      .get("/allbrand")
      .then((response) => {
        console.log(response);
        this.setState({ pBrand: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Image Submit Handler
  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files });
    this.setState({ selectedName: event.target.files.name });
    console.log(event.target.files);
  };
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };
  changeHandler2 = (e) => {
    this.setState({ stock: e.target.value });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = () => {
    // e.preventDefault();
    //console.log(this.state);

    const data = new FormData();
    data.append("product_name", this.state.product_name);
    data.append("sku_no", this.state.sku_no);
    data.append("hsn_sac_no", this.state.hsn_sac_no);
    data.append("short_desc", this.state.short_desc);
    data.append("long_desc", this.state.long_desc);
    data.append("brand", this.state.brand);
    data.append("productcategory", this.state.productcategory);
    data.append("productsubcategory", this.state.productsubcategory);
    data.append("unit", this.state.unit);
    data.append("gst", this.state.gst);
    data.append("cost_price", this.state.cost_price);
    data.append("sell_price", this.state.sell_price);
    data.append("colour", this.state.colour);
    data.append("size", this.state.size);
    data.append("material", this.state.material);
    data.append("stock", this.state.stock);
    data.append("qty", this.state.qty);
    data.append("reorder_level", this.state.reorder_level);
    data.append("status", this.state.status);
    data.append("sortorder", this.state.sortorder);
    for (const file of this.state.selectedFile) {
      if (this.state.selectedFile !== null) {
        data.append("product_img", file, file.name);
      }
    }

    // for (var key of data.keys()) {
    //   console.log(key);
    // }
    // for (var value of data.values()) {
    //   console.log(value);
    // }

    axiosConfig
      .post("/addproduct", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const steps = [
      {
        title: "1",
        content: (
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Product Name</Label>
                <Input
                  type="text"
                  placeholder="Name"
                  name="product_name"
                  value={this.state.product_name}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>SKU Code</Label>
                <Input
                  type="number"
                  placeholder="SKU Code"
                  name="sku_no"
                  value={this.state.sku_no}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>HSN / SAC Number</Label>
                <Input
                  type="number"
                  placeholder="HSN/SAC"
                  name="hsn_sac_no"
                  value={this.state.hsn_sac_no}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Short Description</Label>
                <Input
                  type="textarea"
                  name="short_desc"
                  value={this.state.short_desc}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Long Description</Label>
                <Input
                  type="textarea"
                  name="long_desc"
                  value={this.state.long_desc}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Brand</Label>
                <CustomInput
                  type="select"
                  name="brand"
                  value={this.state.brand}
                  onChange={this.changeHandler}
                >
                  {this.state.pBrand?.map((brandp) => (
                    <option value={brandp._id} key={brandp._id}>
                      {brandp.name}
                    </option>
                  ))}
                </CustomInput>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Colour</Label>
                <Input
                  type="text"
                  placeholder="Colour"
                  name="colour"
                  value={this.state.colour}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Size</Label>
                <Input
                  type="text"
                  placeholder="Size"
                  name="size"
                  value={this.state.size}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Material</Label>
                <Input
                  type="text"
                  placeholder="Material"
                  name="material"
                  value={this.state.material}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label className="mb-1">Stock Available</Label>
                <div
                  className="form-label-group"
                  onChange={(e) => this.changeHandler2(e)}
                >
                  <input
                    style={{ marginRight: "3px" }}
                    type="checkbox"
                    name="stock"
                    value="Available"
                  />
                  <span style={{ marginRight: "20px", fontWeight: 800 }}>
                    Available
                  </span>

                  <input
                    style={{ marginRight: "3px" }}
                    type="checkbox"
                    name="stock"
                    value="UnAvailable"
                  />
                  <span style={{ marginRight: "3px", fontWeight: 800 }}>
                    UnAvailable
                  </span>
                </div>
              </FormGroup>
            </Col>
          </Row>
        ),
      },
      {
        title: "2",
        content: (
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Product Category</Label>
                <CustomInput
                  type="select"
                  name="productcategory"
                  value={this.state.productcategory}
                  onChange={this.changeHandler}
                >
                  {this.state.productC.map((productCategory) => (
                    <option
                      value={productCategory._id}
                      key={productCategory._id}
                    >
                      {productCategory.name}
                    </option>
                  ))}
                </CustomInput>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Product Sub Category</Label>
                <CustomInput
                  type="select"
                  name="productsubcategory"
                  value={this.state.productsubcategory}
                  onChange={this.changeHandler}
                >
                  {this.state.productSC.map((productSCategory) => (
                    <option
                      value={productSCategory._id}
                      key={productSCategory._id}
                    >
                      {productSCategory.name}
                    </option>
                  ))}
                </CustomInput>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Stock Quantity</Label>
                <Input
                  type="number"
                  placeholder="Stock Quantity"
                  name="qty"
                  value={this.state.qty}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Re-Order Level</Label>
                <Input
                  type="number"
                  placeholder="Stock Quantity"
                  name="reorder_level"
                  value={this.state.reorder_level}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Units</Label>
                <CustomInput
                  type="select"
                  placeholder="Select"
                  name="unit"
                  value={this.state.unit}
                  onChange={this.changeHandler}
                >
                  {this.state.units.map((dUnits) => (
                    <option value={dUnits._id} key={dUnits._id}>
                      {dUnits.units_title}
                    </option>
                  ))}
                </CustomInput>
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label>Cost Price</Label>
                <InputGroup>
                  <InputGroupText>₹</InputGroupText>
                  <Input
                    type="number"
                    name="cost_price"
                    value={this.state.cost_price}
                    onChange={this.changeHandler}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Selling Price</Label>
                <InputGroup>
                  <InputGroupText>₹</InputGroupText>
                  <Input
                    type="number"
                    name="sell_price"
                    value={this.state.sell_price}
                    onChange={this.changeHandler}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>GST Rate</Label>
                <InputGroup>
                  <InputGroupText>₹</InputGroupText>
                  <Input
                    type="text"
                    name="gst"
                    value={this.state.gst}
                    onChange={this.changeHandler}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        ),
      },
      {
        title: 3,
        content: (
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>Product Image</Label>
                <CustomInput
                  type="file"
                  onChange={this.onChangeHandler}
                  multiple
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>SortOrder</Label>
                <Input
                  type="number"
                  placeholder=""
                  name="sortorder"
                  value={this.state.sortorder}
                  onChange={this.changeHandler}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
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
                  <span style={{ marginRight: "20px", fontWeight: 800 }}>
                    Active
                  </span>

                  <input
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Inactive"
                  />
                  <span style={{ marginRight: "3px", fontWeight: 800 }}>
                    Inactive
                  </span>
                </div>
              </FormGroup>
            </Col>
          </Row>
        ),
      },
    ];
    //
    return (
      <Card>
        <Row className="m-2">
          <Col>
            <h1 col-sm-6 className="float-left">
              Add My Product
            </h1>
          </Col>
          <Col>
            <Button
              className=" btn btn-danger float-right"
              onClick={() => history.push("/app/products/product/productsList")}
            >
              Back
            </Button>
          </Col>
        </Row>
        <CardBody>
          <Wizard enableAllSteps onFinish={this.submitHandler} steps={steps} />
        </CardBody>
      </Card>
    );
  }
}

export default AddMyProduct;
