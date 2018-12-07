import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'antd/dist/antd.css';
import { Calendar, Alert, Badge } from 'antd';
import moment from 'moment';


function onPanelChange(value, mode) {
    // "year"
    // "month"
    // Moment{}
    console.log(`value = `, value);
    console.log(`mode = `, mode);
}

// let value = moment("2018-12-12");

// console.log(`moment value = `, value);

function onSelect(value) {
    // console.log(`value = `, value);
}

function onClickItem(value) {
    // e.preventDefault();
    // console.log(`item value = \n`, value);
    // console.log(`item value.target = \n`, value.target);
    // console.log(`item value.target.dataset.uid = \n`, value.target.parent.dataset.uid);
    console.log(`item value.target.parentElement.dataset.uid = \n`, value.target.parentElement.dataset.uid);
}

function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: "warning", content: "This is warning event." },
                { type: "success", content: "This is usual event." }
            ];
            break;
        case 10:
            listData = [
                { type: "warning", content: "This is warning event." },
                { type: "success", content: "This is usual event." },
                { type: "error", content: "This is error event." }
            ];
            break;
        case 15:
            listData = [
                { type: "warning", content: "This is warning event" },
                {
                    type: "success",
                    content: "This is very long usual event。。...."
                },
                { type: "error", content: "This is error event 1." },
                { type: "error", content: "This is error event 2." },
                { type: "error", content: "This is error event 3." },
                { type: "error", content: "This is error event 4." }
            ];
            break;
        default:
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {listData.map(item => (
                <li
                    onClick={onClickItem}
                    key={item.content}>
                    <Badge
                        data-uid={item.content}
                        status={item.type}
                        text={item.content} />
                </li>
            ))}
        </ul>
    );
}

function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}


class App extends Component {
    constructor(props) {
        super();
        this.state = {
          value: moment('2017-01-25'),
          selectedValue: moment('2017-01-25'),
        };
        // this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (
            <div className="App">
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header> */}
                <Calendar
                    onSelect={onSelect}
                    onPanelChange={onPanelChange}
                    dateCellRender={dateCellRender}
                    monthCellRender={monthCellRender}
                />
            </div>
        );
    }
}

export default App;
