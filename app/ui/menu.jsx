import React from 'react';
import { Button, Container, Form, Navbar } from 'react-bootstrap';
import { isLoading } from './notes-provider.jsx';
import Spinner from './spinner.jsx';

const Menu = (props) => {
    return (
        <Navbar className="navbar">
            <Container fluid className="justify-content-start">
                <Button
                    variant="outline-success"
                    onClick={props.onNew}
                >New</Button>&nbsp;
                <Button
                    variant="outline-success"
                    onClick={props.onRefresh}
                >Refresh</Button>&nbsp;
                <Form.Control
                    placeholder="Search"
                    style={{
                        width: 150
                    }}
                    autoComplete="off"
                    type="text"
                    onChange={(event) => {
                        props.onFilter(event.target.value);
                    }}
                />
                <Spinner visible={isLoading()} />
            </Container>
        </Navbar>
    )
}

export default Menu;