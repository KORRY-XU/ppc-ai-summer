import React from "react";
import { LockOutlined, ReloadOutlined } from "@ant-design/icons";
import {Input, Button} from "antd";
import Sitelink from "../sitelink-preview/Sitelink";

function Callout({callout}) {
    return (
        <div style={{
            float: 'left',
            margin: "5px"
        }}>
            <div>Callout({0})</div>
            <Input placeholder="callout" title="Sitelink" style={{width: '190px'}} value={callout}/>
            <Button><LockOutlined /></Button>
            <Button><ReloadOutlined /></Button>
        </div>
    );
}

export default Callout;
