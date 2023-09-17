import React from "react";
import { Button, Space } from "antd";

function HotelFooter() {
    return (
        <div
            style={{
                maxHeight: "75px",
                maxWidth: "2530px",
                float: "none",
            }}
        >
            {/* <h1>HotelFooter</h1> */}
            <Space wrap>
                <Button onClick={console.log("Retry button.")}>
                    Retry({0})
                </Button>
                <Button onClick={console.log("Discard button.")} type="dashed">
                    Discard
                </Button>
                <Button onClick={console.log("Submit button.")} type="primary">
                    That's it!
                </Button>
            </Space>
        </div>
    );
}

export default HotelFooter;
