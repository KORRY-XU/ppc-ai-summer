import React from "react";
import { LockOutlined, ReloadOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

const num = [1, 2, 3, 4, 5];

const inputStyle = {
    width: "20%",
    marginBottom: "5px",
};
function Sitelink({ siteLink }) {
    return (
        <div
            style={{
                margin: "20px",
                width: "200px",
                height: "350px",
                display: "inline",
                float: "left",
                marginLeft: "40px",
            }}
        >
            <div>
                <b>Sitelink({num[0]}) </b>
                <Button>
                    {" "}
                    <LockOutlined />
                </Button>
                <Button>
                    <ReloadOutlined />
                </Button>
            </div>

            <div>
                <div style={{ marginBottom: "5px" }}>
                    <span>Title</span>
                </div>
                <Input placeholder="Title" style={{ inputStyle }} value={siteLink.title}/>
                <div>
                    <br />
                </div>
                <div style={{ marginBottom: "5px" }}>
                    <span>Final URL</span>
                </div>
                <Input placeholder="Final URL" style={{ inputStyle }} value={siteLink.finalUrl} /> <br />
                <div>
                    <br />
                </div>
                <div style={{ marginBottom: "5px" }}>
                    <span>Description 1</span>
                </div>
                <Input placeholder="Description 1" style={{ inputStyle }} value={siteLink.description1}/>
                <div>
                    <br />
                </div>
                <div style={{ marginBottom: "5px" }}>
                    <span>Description 2</span>
                </div>
                <Input placeholder="Description 2" style={{ inputStyle }} value={siteLink.description2}/>
                <div>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default Sitelink;
