import React, { useEffect, useState } from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import { render } from 'react-dom';

const Spinner = (props) => {
    return (
        <BootstrapSpinner animation="border" role="status" hidden={props.visible === false} className="ms-2">
            <span className="visually-hidden">Loading...</span>
        </BootstrapSpinner>
        // <div className="position-absolute top-50 translate-middle end-0"></div>
    )
};

export default Spinner;