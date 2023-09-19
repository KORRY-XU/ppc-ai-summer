import React from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

function HotelFooter({ profile }) {
    const navigate = useNavigate();

    const goToHotel = () => {
        navigate("/hotel/1", {
            replace: false,
            state: profile,
        });
    }
    const goToHotelList = () => {
        navigate("/hotel", {
            replace: false,
            state: {},
        });
    }
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
                <Button onClick={goToHotelList()} type="dashed">
                    Discard
                </Button>
                <Button onClick={goToHotel()} type="primary">
                    That's it!
                </Button>
            </Space>
        </div>
    );
}

export default HotelFooter;
