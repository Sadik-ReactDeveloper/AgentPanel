// import React, { Component } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardBody,
//   Row,
//   Col,
//   Form,
//   Label,
//   Input,
//   CustomInput,
//   Button,
// } from "reactstrap";
// import  axiosConfig from "../../../axiosConfig";
// export default class AddSeller extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         first_name : "",
//         last_name: "",
//         walletId: "",
//         wallet_balance:"",
//         selectedFile: null,
//         status: ""
//     };
//   }
//   onChangeHandler = (event) => {
//     this.setState({ selectedFile: event.target.files[0] });
//     this.setState({ selectedName: event.target.files[0].name });
//     console.log(event.target.files[0]);
//   };

//   changeHandler1 = (e) => {
//     this.setState({ status: e.target.value });
//   };
//   changeHandler = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
//   submitHandler = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("first_name", this.state.first_name);
//     data.append("last_name", this.state.last_name);
//     data.append("walletId", this.state.walletId);
//     data.append("wallet_balance", this.state.wallet_balance);
//     data.append("status", this.state.status);
 
//     for (var value of data.values()) {
//       console.log(value);
//     }

//     for (var key of data.keys()) {
//       console.log(key);
//     }

    
   
//     axiosConfig.post("/addwallet", data)
//       .then((response) => {
//         console.log(response);
//         alert("Wallet Added Successful")
//         this.props.history.push("/app/wallet/walletList");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
  
//   render() {
//     return (
//       <div>
//         <Card>
//           <CardHeader>
//             <CardTitle>Add Wallet</CardTitle>
//           </CardHeader>
//           <CardBody>
//             <Form className="m-1" onSubmit={this.submitHandler}>
//               <Row>
//                 <Col lg="6" md="6" sm="6" className="mb-2">
//                   <Label>First Name</Label>
//                   <Input   
//                     required 
//                     type="text" 
//                     name="first_name"
//                     placeholder="Enter First Name" 
//                     value={this.state.first_name}
//                     onChange={this.changeHandler}>
//                   </Input>
//                 </Col>
//                 <Col lg="6" md="6" sm="6" className="mb-2">
//                   <Label>Last Name</Label>
//                   <Input   
//                     required 
//                     type="text" 
//                     name="last_name"
//                     placeholder="Enter Last Name" 
//                     value={this.state.last_name}
//                     onChange={this.changeHandler}>
//                   </Input>
//                 </Col>
//                 {/* <Col lg="6" md="6" sm="6" className="mb-2">
//                   <Label>Wallet Id</Label>
//                   <Input   
//                     required 
//                     type="text" 
//                     name="walletId"
//                     placeholder="Enter Wallet Id"  
//                     value={this.state.walletId}
//                     onChange={this.changeHandler}>
//                   </Input> 
//                 </Col> */}
//                 <Col lg="6" md="6" sm="6" className="mb-2">
//                   <Label>Wallet Balance</Label>
//                   <Input   
//                     required 
//                     type="number" 
//                     name="wallet_balance"
//                     placeholder="Enter Wallet Balance"  
//                     value={this.state.wallet_balance}
//                     onChange={this.changeHandler}>
//                   </Input> 
//                 </Col>
//                </Row>
//               <Col lg="6" md="6" sm="6" className="mb-2">
//                   <Label className="mb-1">Status</Label>
//                   <div
//                     className="form-label-group"
//                     onChange={(e) => this.changeHandler1(e)}
//                   >
//                     <input
//                       style={{ marginRight: "3px" }}
//                       type="radio"
//                       name="status"
//                       value="Active"
//                     />
//                     <span style={{ marginRight: "20px" }}>Active</span>

//                     <input
//                       style={{ marginRight: "3px" }}
//                       type="radio"
//                       name="status"
//                       value="Inactive"
//                     />
//                     <span style={{ marginRight: "3px" }}>Inactive</span>
//                   </div>
//                 </Col> 
//               <Row>
//                 <Col lg="6" md="6" sm="6" className="mb-2">
//                   <Button.Ripple
//                     color="primary"
//                     type="submit"
//                     className="mr-1 mb-1">
//                     Add Wallet
//                   </Button.Ripple>
//                 </Col>
//               </Row>
//             </Form>
//           </CardBody>
//         </Card>
//       </div>
//     );
//   }
// }
