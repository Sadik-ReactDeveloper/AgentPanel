import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
  Label,
} from "reactstrap";
import { history } from "../../../history";
import resetImg from "../../../assets/img/pages/reset-password.png";
import "../../../assets/scss/pages/authentication.scss";
import axiosConfig from "../../../axiosConfig";

class OtpVerify extends React.Component {
  state = {
    otp: "",
  };

  handlechange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  SubmitOtp = async (e) => {
    e.preventDefault();
    const { otp } = this.state;

    var mobileUrl = "";
    var idUrl = "";
    const queryParams = new URLSearchParams(window.location.href);
    mobileUrl = queryParams.get("mobile");
    idUrl = queryParams.get("id");

    // var isValid = await this.validatePhone(otp)
    // if(isValid === false){
    //   this.setState({ isError: true });

    //    return true;
    // }

    var payload = {
      mobile: mobileUrl,
      otp: otp,
    };
    axiosConfig
      .post("/api//user/verifyotp", payload)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          console.log(response.data.otp);
          console.log(response.data._id);
          this.props.history.push(`/pages/reset-password/` + idUrl);
          // localStorage.setItem("auth", response.data.data?._id);
          // window.location.replace("/#/");
        } else {
          alert(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-5"
              >
                <img className="px-5 mx-2" src={resetImg} alt="resetImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 py-50">
                  <CardHeader className="pb-1 pt-1">
                    <CardTitle>
                      <h4 className="mb-0">Reset Password</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                    Please enter your email address and new password to
                    continue.
                  </p>
                  <CardBody className="pt-1">
                    <Form>
                      <FormGroup className="form-label-group">
                        <Input
                          type="number"
                          name="otp"
                          onChange={this.handlechange}
                          placeholder="OTP"
                          required
                        />
                        <Label>OTP</Label>
                      </FormGroup>
                      <div className="d-flex justify-content-between flex-wrap flex-sm-row flex-column">
                        <Button.Ripple
                          block
                          className="btn-block"
                          color="primary"
                          outline
                          onClick={(e) => {
                            e.preventDefault();
                            // this.props.history.push("/pages/login")
                          }}
                        >
                          Go Back to Login
                        </Button.Ripple>
                        <Button.Ripple
                          block
                          color="primary"
                          type="submit"
                          className="btn-block mt-1 mt-sm-0"
                          onClick={this.SubmitOtp}
                        >
                          Reset
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default OtpVerify;

// import React from "react"
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardBody,
//   Row,
//   Col,
//   Form,
//   Button
// } from "reactstrap"
// import otpimg from "../../../assets/img/logo/otpimg.png"
// import { User, Lock } from "react-feather"
// import { history } from "../../../history"
// import "../../../assets/scss/pages/authentication.scss"
// import OtpInput from 'react-otp-input';
// import axios from "axios";

// class OtpVerify extends React.Component {

//   state ={
//      otp: ''
//   };

//   handleChange = (otp) => {
//     console.log(otp)
//     this.setState({ otp })
//   };

//   // handleChange = (otp) => this.setState({ otp });
//   // handlechange = (e) => {
//   //   //e.preventDefault();
//   //   console.log('@@@@@@',e.target.name)
//   //   this.setState({ [e.target.name]: e.target.value });
//   // };
//   SubmitOtp = async (e) => {
//     e.preventDefault();
//     const {otp} = this.state;

//     var mobileUrl = '';
//     const queryParams = new URLSearchParams(window.location.href);
//     mobileUrl = queryParams.get('mobile');

//     // var isValid = await this.validatePhone(otp)
//     // if(isValid === false){
//     //   this.setState({ isError: true });

//     //    return true;
//     // }

//     var payload = {
//       mobile : mobileUrl,
//       otp:otp
//     }
//     axios
//     .post("http://3.108.185.7/nodejs/api/user/verifyotp", payload)
//     .then((response) => {
//       console.log(response.data);
//       if(response.data.status === 'success'){
//         console.log(response.data.otp);
//         this.props.history.push(`/pages/reset-password`);
//         // localStorage.setItem("auth", response.data.data?._id);
//         // window.location.replace("/#/");
//       }else{
//           alert(response.data.msg)
//       }

//     })
//     .catch((error) => {
//       console.log(error.response);
//     });
// };

//   render() {

//     return (
//       <Row className="m-0 justify-content-center">
//         <Col
//           sm="8"
//           xl="7"
//           lg="10"
//           md="8"
//           className="d-flex justify-content-center"
//         >
//           <Card className="bg-authentication rounded-0 mb-0 w-100">
//             <Row className="m-0">
//               <Col
//                 lg="6"
//                 className="d-lg-block d-none text-center align-self-center px-5 w-100"
//               >
//                 <img src={otpimg} alt="lsImg" className="" width="100%"/>
//               </Col>
//               <Col lg="6" md="12" className="p-0">
//                 <Card className="rounded-0 mb-0 px-1 pb-2 w-100 h-100 lg-mx-5">
//                   <CardHeader className="pb-1">
//                     <CardTitle>
//                       <h4 className="mb-0">Enter Your OTP Here</h4>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardBody className="rst1">
//                     <Form>
//                     <OtpInput
//                       //value={this.state.otp}
//                       //type="number"
//                       onChange={otp => console.log(otp)}
//                       numInputs={4}
//                       //onChange={this.handlechange}

//                       name="otp"
//                       //placeholder="OTP"
//                       //required
//                       separator={<span>-</span>}
//                       inputStyle={{
//                         width: "3rem",
//                         height: "3rem",
//                         margin: "1rem 1rem",
//                         fontSize: "1rem",
//                         borderRadius: 4,
//                         border: "1px solid rgba(0,0,0,0.3)"
//                       }}
//                     />
//                       <div className="d-flex justify-content-between align-items-center flex-wrap pt-5">
//                         <span
//                           className="text-primary"
//                           onClick={() => history.push("/pages/login")}
//                         >
//                           Are you not John Doe ?
//                         </span>
//                         <div>
//                           <Button.Ripple
//                             className="unlock-btn"
//                             color="primary"
//                             type="submit"
//                             onClick={this.SubmitOtp}
//                           >
//                             Submit
//                           </Button.Ripple>
//                         </div>
//                       </div>
//                     </Form>
//                   </CardBody>
//                 </Card>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     )
//   }
// }
// export default OtpVerify
