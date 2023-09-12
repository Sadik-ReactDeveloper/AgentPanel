import React from "react";
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
// import swal from "sweetalert";
import FileSaver from "file-saver";
// import { ImageGroup, Image } from "react-fullscreen-image";
import axiosConfig from "../../../axiosConfig";
import { ContextLayout } from "../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import {
  Edit,
  Trash2,
  ChevronDown,
  Smartphone,
  View,
  Eye,
} from "react-feather";
//import classnames from "classnames";
// import { history } from "../../../history";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
const images = [
  "https://unsplash.com/photos/Bkci_8qcdvQ",
  "https://unsplash.com/photos/hS46bsAASwQ",
  "https://unsplash.com/photos/2VDa8bnLM8c",
  "https://unsplash.com/photos/_LuLiJc1cdo",
  "https://unsplash.com/photos/1Z2niiBPg5A",
  "https://unsplash.com/photos/pHANr-CpbYM",
  "https://unsplash.com/photos/pQMM63GE7fo",
  "https://unsplash.com/photos/2VDa8bnLM8c",
  "https://unsplash.com/photos/MBkQKiH14ng",
];
class PnLSheetList extends React.Component {
  state = {
    rowData: [],
    down: "",
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
        filter: true,
      },

      {
        headerName: "P&L Image",
        field: "pnlimg",
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              {/* {params.data.pnlimg[0]} */}
              <img src={params.data.pnlimg[0]} alt="P&L" height={200} />
            </div>
          );
        },
      },

      // {
      //   headerName: "Download",
      //   field: "download",
      //   width: 200,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="cursor-pointer">
      //         <button
      //           onClick={
      //             () =>
      //               this.sayHello(
      //                 "https://trupee.s3.amazonaws.com/64b7ecabbc633e04629eed06.image.jpg",
      //                 "Images.jpg"
      //               )
      //             // this.sayHello(` ${params.data?.pnlimg?.[0]}`, "Images.png")
      //           }
      //         >
      //           download
      //         </button>
      //       </div>
      //     );
      //   },
      // },
      {
        headerName: "User Name",
        field: "firstname",
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex  align-items-center cursor-pointer">
              <span>
                {params.data.userId?.firstname} {params.data.userId?.lastname}
              </span>
            </div>
          );
        },
      },

      {
        headerName: "Email Id",
        field: "email",
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <span>{params.data.userId?.email}</span>
            </div>
          );
        },
      },
      {
        headerName: "Moblie",
        field: "mobile",
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <span>{params.data.userId?.mobile}</span>
            </div>
          );
        },
      },

      {
        headerName: "Actions",
        field: "sortorder",
        width: 150,
        pinned: window.innerWidth > 992 ? "right" : false,
        cellRendererFramework: (params) => {
          return (
            <div className="actions cursor-pointer">
              <Route
                render={({ history }) => (
                  <Eye
                    className="mr-50"
                    size="25px"
                    color="green"
                    onClick={() =>
                      history.push(`/app/trade/ViewpnLSheet/${params.data._id}`)
                    }
                  />
                )}
              />

              <Trash2
                size={20}
                color="red"
                onClick={() => {
                  let selectedData = this.gridApi.getSelectedRows();
                  this.runthisfunction(params.data._id);
                  this.gridApi.updateRowData({ remove: selectedData });
                }}
              />
            </div>
          );
        },
      },
    ],
  };

  async componentDidMount() {
    await axiosConfig.get(`/admin/getPnlSheet`).then((response) => {
      this.setState({ down: response.data.data[0].pnlimg[0] });
      const rowData = response.data.data;
      this.setState({ rowData });
    });
  }
  async runthisfunction(id) {
    console.log(id);
    await axiosConfig.get(`/dltPnlsheet/${id}`).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  handleDownload = () => {
    const imageUrl = "https://example.com/image.jpg"; // Replace with the actual image URL

    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image.jpg"; // Set the desired image name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // sayHello = (img) => {
  //   var blob = new Blob([img], {
  //     type: "image/jpeg",
  //   });
  //   FileSaver.saveAs(blob, "trupee.png");
  //   const link = document.createElement("a");
  //   link.href = img;

  //   // Set the filename for the downloaded image (you can modify this as needed).
  //   link.download = "dynamic-image.jpg";

  //   // Programmatically click the anchor element to trigger the download.
  //   link.click();
  // };
  sayHello = (url, name) => {
    fetch(url)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        // a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert("An error sorry"));
  };
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
      <Row className="app-user-list">
        <Col sm="12"></Col>
        <Col sm="12">
          <Card>
            <Row className="m-2">
              <Col>
                <h1 sm="6" className="float-left">
                  P&L Screenshort List
                </h1>
              </Col>
            </Row>
            <CardBody>
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
                          onChange={(e) =>
                            this.updateSearchQuery(e.target.value)
                          }
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
        </Col>
      </Row>
    );
  }
}
export default PnLSheetList;
