import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Triangle from './triangle.jsx';

const ListItem = (props) => {

    const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg>

    const toTwoCharNumber = (number) => {
        return (number < 10 ? '0' : '') + number;
    }

    const formatDate = (date) => {
        if (!date)
            return '';
        let d = new Date(date);
        return d.getFullYear() + '-' + toTwoCharNumber(d.getMonth()) + '-' + toTwoCharNumber(d.getDate()) + ' ' + toTwoCharNumber(d.getHours()) + ':' + toTwoCharNumber(d.getMinutes()) + ':' + toTwoCharNumber(d.getSeconds());
    }

    const shortText = (text, length) => {
        return (text = text.slice(0, length)) + (text.length === length ? '...' : '');
    }

    return (
        <div className="list-item">
            <div
                onClick={() => {
                    props.onClick(props.id);
                }}
                key={props.id}
                href="#"
                className={`note list-group-item list-group-item-action py-3 lh-tight ${props.active ? 'note--active' : ''}`}
                aria-current="true">
                <Row>
                    <Col><strong className="mb-1">{shortText(props.title, 40)}</strong></Col>
                    <Col className="text-end">
                        <small style={{ fontSize: '0.8rem' }}>{formatDate(props.date)}</small>
                        <Triangle size={30} color="#dc3545" onClick={props.onDelete}>&times;</Triangle>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <div className="small">{shortText(props.content, 30)}</div>
                </Row>
            </div>
        </div>
    )
}

export default ListItem;