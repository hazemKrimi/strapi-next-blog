import React from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Input } from 'reactstrap'

class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  search = event => {
    if (event.key == "Enter") window.location.replace(`/search?q=${event.target.value}`);
  }

  render() {
    return (
      <nav>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Blog</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="mx-2">
                <NavLink href="/categories" >Categories</NavLink>
              </NavItem>
              <NavItem>
                <Input type="search" id="search" placeholder="Press Enter to Search" onKeyPress={this.search} />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </nav>
    );
  }
}

export default MainNav
