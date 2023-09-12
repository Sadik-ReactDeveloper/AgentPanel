import React from "react"
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"
import classnames from "classnames"
import { Eye, Code, ChevronDown } from "react-feather"
import { dropdownFlat } from "./DropdownsSourceCode"

class DropdownFlat extends React.Component {
  state = {
    activeTab: "1"
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Flat</CardTitle>
            <div className="views">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggleTab("1")
                    }}
                  >
                    <Eye size={15} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggleTab("2")
                    }}
                  >
                    <Code size={15} />
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </CardHeader>
          <CardBody>
            <p>
              Use class <code>color="flat-*"</code> to create a flat drodpown.
            </p>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="dropdown mr-1 mb-1 d-inline-block">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle color="flat-primary" caret>
                      Primary
                      <ChevronDown size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag="a">Option 1</DropdownItem>
                      <DropdownItem tag="a">Option 2</DropdownItem>
                      <DropdownItem tag="a">Option 3</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>
                <div className="dropdown mr-1 mb-1 d-inline-block">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle color="flat-success" caret>
                      Success
                      <ChevronDown size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag="a">Option 1</DropdownItem>
                      <DropdownItem tag="a">Option 2</DropdownItem>
                      <DropdownItem tag="a">Option 3</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>
                <div className="dropdown mr-1 mb-1 d-inline-block">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle color="flat-info" caret>
                      Info
                      <ChevronDown size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag="a">Option 1</DropdownItem>
                      <DropdownItem tag="a">Option 2</DropdownItem>
                      <DropdownItem tag="a">Option 3</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>
                <div className="dropdown mr-1 mb-1 d-inline-block">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle color="flat-danger" caret>
                      Danger
                      <ChevronDown size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag="a">Option 1</DropdownItem>
                      <DropdownItem tag="a">Option 2</DropdownItem>
                      <DropdownItem tag="a">Option 3</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>
                <div className="dropdown mr-1 mb-1 d-inline-block">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle color="flat-warning" caret>
                      Warning
                      <ChevronDown size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag="a">Option 1</DropdownItem>
                      <DropdownItem tag="a">Option 2</DropdownItem>
                      <DropdownItem tag="a">Option 3</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>
                <div className="dropdown mr-1 mb-1 d-inline-block">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle color="flat-light" caret>
                      Light
                      <ChevronDown size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag="a">Option 1</DropdownItem>
                      <DropdownItem tag="a">Option 2</DropdownItem>
                      <DropdownItem tag="a">Option 3</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>
                <div className="dropdown mr-1 mb-1 d-inline-block">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle color="flat-dark" caret>
                      Dark
                      <ChevronDown size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag="a">Option 1</DropdownItem>
                      <DropdownItem tag="a">Option 2</DropdownItem>
                      <DropdownItem tag="a">Option 3</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>
              </TabPane>
              <TabPane className="component-code" tabId="2">
                {dropdownFlat}
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default DropdownFlat
