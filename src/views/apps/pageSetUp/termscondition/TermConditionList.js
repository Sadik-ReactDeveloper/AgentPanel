import React from "react";
import {
  Row,
  Card,
  CardBody,
  Input,
  Button,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import axiosConfig from "../../../../axiosConfig";
import { AgGridReact } from "ag-grid-react";
import { ContextLayout } from "../../../../utility/context/Layout";
import { ChevronDown, Edit, Trash2 } from "react-feather";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import { Route } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import swal from "sweetalert";
class termscondition extends React.Component {
  state = {
    rowData: [],
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true,
    },
    columnDefs: [
      {
        headerName: "S.No",
        valueGetter: "node.rowIndex + 1",
        field: "node.rowIndex + 1",
        width: 100,
        // filter: true,
      },
      {
        headerName: "Descriptions",
        field: "desc",
        left: 200,
        width: 600,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <span>{ReactHtmlParser(params.data.desc)}</span>
            </div>
          );
        },
      },

      // {
      //   headerName: "Status",
      //   field: "userverified",
      //   // filter: true,
      //   width: 150,
      //   cellRendererFramework: (params) => {
      //     return params.value === "Active" ? (
      //       <div className="badge badge-pill badge-success">
      //         {params.data.userverified}
      //       </div>
      //     ) : params.value === "Inactive" ? (
      //       <div className="badge badge-pill badge-warning">
      //         {params.data.userverified}
      //       </div>
      //     ) : null;
      //   },
      // },
      {
        headerName: "Actions",
        field: "sortorder",
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div className="actions cursor-pointer">
              <Route
                render={({ history }) => (
                  <Edit
                    className="mr-50"
                    size="25px"
                    color="blue"
                    onClick={() =>
                      history.push(
                        `/app/pageSetUp/termscondition/EditTermCondition/${params.data._id}`
                      )
                    }
                  />
                )}
              />

              {/* <Trash2
                className="mr-50"
                size="25px"
                color="red"
                onClick={() => {
                  this.runthisfunction(params.data._id);
                }}
              /> */}
            </div>
          );
        },
      },
    ],
  };
  componentDidMount() {
    this.termsConditionList();
  }
  termsConditionList = () => {
    axiosConfig.get("/admin/get_term_cond").then((response) => {
      const rowData = response.data.data;
      this.setState({ rowData });
    });
  };

  runthisfunction(id) {
    swal(
      `Do You Want To Delete Permanently`,
      "This item will be deleted immediately",

      {
        buttons: {
          cancel: "Cancel",
          catch: { text: "Delete ", value: "catch" },
        },
      }
    ).then((value) => {
      switch (value) {
        case "cancel":
          break;
        case "catch":
          axiosConfig.get(`/admin/dlt_abtus/${id}`).then((response) => {
            console.log(response.data);
            this.termsConditionList();
          });
          break;
        default:
          break;
      }
    });
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages(),
    });
  };

  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
  };

  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        currenPageSize: val,
        getPageSize: val,
      });
    }
  };

  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <React.Fragment>
        {/* <Breadcrumbs
          breadCrumbTitle="Term & Condition List"
          breadCrumbParent="Home"
          breadCrumbActive="Term & Condition List"
        /> */}
        <Card className="overflow-hidden agGrid-card">
          <Row className="m-1">
            <Col>
              <h1 col-sm-6 className="float-left">
                Term & Condition List
              </h1>
            </Col>
          </Row>
          {/* <Col className="pt-4">
            <Route
              render={({ history }) => (
                <Button
                  className=" btn btn-success float-right"
                  onClick={() =>
                    history.push(
                      "/app/pageSetUp/termscondition/AddTermsCondition"
                    )
                  }
                >
                  Add TermConditionList
                </Button>
              )}
            />
          </Col> */}
          <CardBody className="py-0">
            {this.state.rowData === null ? null : (
              <div className="ag-theme-material w-100 my-2 ag-grid-table">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="mb-1">
                    <UncontrolledDropdown className="p-1 ag-dropdown">
                      <DropdownToggle tag="div">
                        {this.gridApi
                          ? this.state.currenPageSize
                          : "" * this.state.getPageSize -
                            (this.state.getPageSize - 1)}{" "}
                        -{" "}
                        {this.state.rowData.length -
                          this.state.currenPageSize * this.state.getPageSize >
                        0
                          ? this.state.currenPageSize * this.state.getPageSize
                          : this.state.rowData.length}{" "}
                        of {this.state.rowData.length}
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(20)}
                        >
                          20
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(50)}
                        >
                          50
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(100)}
                        >
                          100
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(134)}
                        >
                          134
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between mb-1">
                    <div className="table-input mr-1">
                      <Input
                        placeholder="search..."
                        onChange={(e) => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </div>
                    <div className="export-btn">
                      <Button.Ripple
                        color="primary"
                        onClick={() => this.gridApi.exportDataAsCsv()}
                      >
                        Export as CSV
                      </Button.Ripple>
                    </div>
                  </div>
                </div>
                <ContextLayout.Consumer>
                  {(context) => (
                    <AgGridReact
                      gridOptions={{}}
                      rowSelection="multiple"
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={rowData}
                      onGridReady={this.onGridReady}
                      colResizeDefault={"shift"}
                      animateRows={true}
                      floatingFilter={false}
                      pagination={true}
                      paginationPageSize={this.state.paginationPageSize}
                      pivotPanelShow="always"
                      enableRtl={context.state.direction === "rtl"}
                    />
                  )}
                </ContextLayout.Consumer>
              </div>
            )}
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
export default termscondition;
