import React, { useEffect, useState } from 'react';
import { Col, Container, Form, FormLabel, InputGroup, Row } from 'react-bootstrap';

const Editor = (props) => {

    const handleChange = (event) => {
        props.onChange(event.target.name, event.target.value);
    }

    return (
        <div className="editor">
            <InputGroup>
                <Col>
                    <Row>
                        <Col>
                            <FormLabel>Title</FormLabel>
                            <Form.Control
                                type="text"
                                name="title"
                                value={props.title}
                                maxLength={50}
                                onChange={handleChange}
                                autoFocus={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormLabel>Content</FormLabel>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                name="content"
                                maxLength={1000000}
                                onChange={handleChange}
                                style={{
                                    resize: 'none'
                                }}
                                value={props.content}
                            />
                        </Col>
                    </Row>
                </Col>
            </InputGroup>
        </div>
    )
}

export default Editor;
