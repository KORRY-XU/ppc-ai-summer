import React, { useEffect } from "react";
import { useState } from "react";
import { ProCard } from "@ant-design/pro-components";

import HotelInfo from "./hotel-info/HotelInfo";
import SitelinkPreview from "./sitelink-preview/SitelinkPreview";
import HotelFooter from "./footer/HotelFooter";

import { Layout, Space } from "antd";
import CalloutPreview from "./hotel-callout/CalloutPreview";
import { useLocation, useNavigate } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;

const extraInfoContents = {
    sessionToken: "fcdeab86-7c60-40e2-96ad-a03346a679ea",
    topicsAndEvents: [
        "International Business Forum Conference",
        "Business tycoons gather",
    ],
    preferential: ["Certificate holders enjoy a 20% discount"],
    sitelinkSpecifications: [
        {
            id: 1,
            content: "beauty of the nature",
        },
        {
            id: 2,
            content:
                "https://www.ihg.com/crowneplaza/hotels/us/en/new-york/nycpc/hoteldetail/dining",
        },
    ],
    requestCount: 1,
};
const hotelProfileInfo = {
    hotelId: 1,
    hotelName: "Hilton London Bankside",
    hotelCountry: "United Kingdom",
    hotelCity: "London",
    hotelBrand: "Hilton",
    hotelChain: "Hilton Hotels & Resorts",
    categories: [
        "Boutique style",
        "Business travel",
        "Spa hotel",
        "Upscale accommodation",
        "5-star Luxury hotel",
    ],
    amenities: [
        "Spacious guest rooms and suites",
        "Fitness center",
        "Spa",
        "Business center",
        "Meeting rooms",
        "Concierge services",
        "24-hour front desk and room service",
        "On-site parking or valet parking",
    ],
};
const hotelRequestParamC = {
    ...hotelProfileInfo,
    ...extraInfoContents,
};

const hotelProfilePreviewC = {
    shortHotelName: "suggestedHotelName",
    descriptions: ["description1.....", "description2 ....."],
    callouts: ["callout1", "callout2", "callout3", "callout4"],
    siteLinks: [
        {
            title: "t1",
            finalUrl: "fu1",
            description1: "description1 of sitelink1",
            description2: "description2 of sitelink1",
        },
        {
            title: "t2",
            finalUrl: "fu2",
            description1: "description1 of sitelink2",
            description2: "description2 of sitelink2",
        },
    ],
};

function HotelContentPreview() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(hotelProfilePreviewC);
    useEffect(() => {
        let ignore = false;
        if (state) {
            setProfile(state);
        }
        return () => {
            ignore = true;
        };
    }, []);
    const contentStyle = {
        textAlign: "left",
        minHeight: 170,
        minWidth: "95%",
        // lineHeight: "120px",
        color: "#fff",
        backgroundColor: "#108ee9",
    };

    const footerStyle = {
        textAlign: "right",
        color: "#fff",
        backgroundColor: "#7dbcea",
        minHeight: "10%",
        minWidth: "90%",
    };
    console.log("routerProfile: " + state);
    // go to hotel page and replace the hotel ads info
    const goToHotel = () => {
        navigate("hotel", {
            replace: false,
            state: {},
        });
    };

    return (
        <div>
            <ProCard
                title="[Hotel Suggestion Preview by AI Tools]"
                extra="2023年9月17日"
                // split={responsive ? "horizontal" : "vertical"}
                split={"horizontal"}
                bordered
                headerBordered
            >
                <ProCard
                    title="Hotel Info"
                    colSpan="50%"
                    headStyle={{ fontSize: "160px" }}
                >
                    <HotelInfo profile={profile} />
                </ProCard>
                <div>
                    <br />
                </div>
                <Layout>
                    <Content
                        style={{
                            textAlign: "left",
                            minHeight: 170,
                            minWidth: "95%",
                        }}
                    >
                        <div>
                            <b>Hotel Callouts:</b>
                        </div>
                        <br />
                        <CalloutPreview profile={profile}/>
                    </Content>
                </Layout>
                <ProCard title="Sitelink Preview">
                    <SitelinkPreview profile={profile}/>
                </ProCard>
                <ProCard style={{ float: "right" }}>
                    <HotelFooter profile={profile}/>
                </ProCard>
            </ProCard>
        </div>
    );
}

export default HotelContentPreview;
