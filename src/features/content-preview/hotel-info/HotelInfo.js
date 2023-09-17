import React from "react";
import { Input } from "antd";

function HotelInfo({profile}) {
    return (
        <div
            style={{
                // backgroundColor: "yellow",
                maxHeight: "522px",
                maxWidth: "2534px",
                float: "none",
            }}
        >
            <div>
                Short Hotel Name: <Input placeholder="Short Hotel Name" value={profile.shortHotelName} style={{width: "300px"}}/>
            </div>
          <br/>
            <div>
              <div>Hotel Descriptions:</div>
              <div>
                <Input placeholder="description 1" value={profile.descriptions[0]} />
              </div>
                <br />
              <div>
                <Input placeholder="description 2" value={profile.descriptions[1]} />
              </div>

            </div>
        </div>
    );
}

export default HotelInfo;
