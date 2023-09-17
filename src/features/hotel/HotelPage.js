import React from "react";
import {
    ProCard,
    DrawerForm,
    ModalForm,
    ProForm,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { useParams, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import {
    Select,
    Space,
    Input,
    Checkbox,
    FloatButton,
    message,
    Button,
} from "antd";
import axios from "axios";

import { FileTextOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { useSelector } from "react-redux";
import { selectHotelById } from "./hotelSlice";
import { useState } from "react";
const { Option } = Select;
const { Panel } = Collapse;

const options1 = [
    "Anytime Free Cancellation",
    "Best-Rate Guarantee",
    "Book Now",
    "Free Cancellation",
];
const options2 = [
    "Lowest Price",
    "Loyalty Discount",
    "No Booking Fees",
    "No Prepayment Needed",
];

const OPTIONS = [
    "Chinese New Year",
    "New Years Day",
    "May Labors Day",
    "Childrens Day",
    "Christmas Day",
];
const hotelProfileInfoC = {
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

const extraInfoC = {
    sessionToken: "427bb217-06c9-4f60-a6bc-7e99c4cdfff7",
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

const HotelPage = () => {
    const [token, setToken] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    const [optionVisit, setOptionVisit] = useState(false);
    const [modalVisit, setModalVisit] = useState(false);
    const navigate = useNavigate();
    const HOTEL_URL = "/service-ai/hotels/";
    const { hotelId } = useParams();

    const [extraInfo, setExtraInfo] = useState(extraInfoC);
    const [hotelProfileInfo, setHotelProfileInfo] = useState(hotelProfileInfoC);

    const getSessionToken = () => {
        const url = "/service-ai/ai-tool/init/1";
        axios.post(url, {}).then(
            (rsp) => {
                console.log("Toke response: " + rsp);
                const { token } = rsp.data;
                console.log("收到Token: ", token);
                setToken(token);
            },
            (error) => {
                console.log("获取token异常: ", error);
                setToken("");
            }
        );
    };
    const getHotelSuggestion = (request) => {
        var { extraInfoContents, hotelProfileInfo } = request;
        console.log("extra info: " + extraInfoContents);
        console.log("hotel info: " + hotelProfileInfo);
        let sessionTokenTmp;
        if (token != "" && token != undefined) {
            sessionTokenTmp = token;
        }
        let requestParam = {
            ...request,
            extraInfoContents: {
                ...extraInfoContents,
                sessionToken: sessionTokenTmp,
            },
        };
        const url = "/service-ai/ai-tool/content/hotel-profile";
        axios.post(url, requestParam).then(
            (rsp) => {
                console.log("收到 Data: ", rsp.data);
                // 跳转到profile页面（带参数）
                manualRouteWithState("profile", rsp.data);
            },
            (error) => {
                console.log("获取hotel suggestion 异常: ", error);
                setToken("");
            }
        );
    };

    useEffect(() => {
        let ignore = false;
        getSessionToken();
        return () => {
            ignore = true;
        };
    }, []);

    const hotel = useSelector((state) =>
        selectHotelById(state, Number(hotelId))
    );

    if (!hotel) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    const [hotelProfile0] = hotel?.hotelProfileAssets;
    const [description1, description2] = hotelProfile0?.pinModeDescriptionPairs;

    let sitelinkContent;
    if (hotelProfile0.sitelinks?.length > 0) {
        sitelinkContent = hotelProfile0.sitelinks.map((sitelink) => {
            return (
                <>
                    <div>Sitelink({sitelink.position}):</div>
                    <div>
                        <Input
                            placeholder="Title of Sitelinke "
                            style={{ width: "450px" }}
                            value={sitelink.title}
                        />
                    </div>
                    <br />
                    <div>
                        <Input
                            placeholder="Description1 of Sitelinke "
                            value={sitelink.description1}
                        />
                    </div>
                    <br />
                    <div>
                        <Input
                            placeholder="Description2 of Sitelinke "
                            value={sitelink.description2}
                        />
                    </div>
                    <br />
                </>
            );
        });
    }
    let calloutContent;
    if (hotelProfile0.callouts?.length > 0) {
        calloutContent = hotelProfile0.callouts.map((callout) => {
            return (
                <>
                    <div>
                        <Input
                            placeholder="custom callout "
                            style={{ width: "450px", margin: "10px" }}
                            value={callout}
                        />
                    </div>
                </>
            );
        });
    }

    const onChange = (e) => {
        console.log("Change:", e.target.value);
    };
    const onOptionChange = (e) => {
        if(e === 'content') {
            // show content suggestion float page. 
            console.log("Content Change:", e);
            setOptionVisit(false);
            setModalVisit(true);
        }else if(e === 'translation') {
            // go to translation page.
            console.log("Translation Change:", e);
        }
    };
    const onSearch = (value) => {
        console.log("search:", value);
    };

    const filterOption = (input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const manualRouteWithState = (url, param) => {
        navigate(url, {
            replace: false,
            state: param,
        });
    };
    return (
        <>
            <Collapse defaultActiveKey={[""]}>
                <Panel header="Place ID" key="1">
                    <p>{"..."}</p>
                </Panel>
                <Panel header="Categories" key="2">
                    <p>{"..."}</p>
                </Panel>
                <Panel header="Amenities" key="3">
                    <p>{"..."}</p>
                </Panel>
            </Collapse>
            <ProCard
                title="Hotel Creatives"
                extra="2023年9月12日"
                // split={responsive ? "horizontal" : "vertical"}
                split={"horizontal"}
                bordered
                headerBordered
            >
                <ProCard title="[Hotel Details]" colSpan="50%" headStyle={{}}>
                    <div>
                        <label>Short Hotel Name</label>
                    </div>
                    <Input
                        showCount
                        maxLength={25}
                        onChange={onChange}
                        value={hotelProfile0?.shortHotelName}
                    />
                    <div>
                        <label>Final URL (Required)</label>
                    </div>
                    <Input
                        onChange={onChange}
                        value={hotelProfile0?.finalUrl}
                    />
                </ProCard>
                <ProCard title="[Descriptions]" colSpan="50%" headStyle={{}}>
                    <div>
                        <label>Description1</label>
                    </div>
                    <Input
                        showCount
                        maxLength={90}
                        onChange={onChange}
                        value={description1.content}
                    />
                    <div>
                        <label>Description2</label>
                    </div>
                    <Input
                        showCount
                        maxLength={90}
                        onChange={onChange}
                        value={description2.content}
                    />
                </ProCard>
                <ProCard title="[Callouts]" colSpan="50%" headStyle={{}}>
                    <Checkbox.Group
                        options={options1}
                        defaultValue={["Book Now", "Free Cancellation"]}
                        onChange={onChange}
                    />
                    <br /> <br />
                    <Checkbox.Group
                        options={options2}
                        defaultValue={["Lowest Price", "No Prepayment Needed"]}
                        onChange={onChange}
                    />
                    <br /> <br />
                    <div>Custom Callout:</div>
                    {calloutContent}
                    <br />
                </ProCard>
                <ProCard title="[Sitelink]" colSpan="50%" headStyle={{}}>
                    {sitelinkContent}
                    <br />
                </ProCard>
            </ProCard>
            {/*
            Ai float Button
            */}
            <FloatButton
                icon={<FileTextOutlined />}
                description=" AI "
                shape="square"
                style={{ right: 165, bottom: 300 }}
                onClick={() => {
                    // setModalVisit(true);
                    setOptionVisit(true);
                }}
            />
            <ModalForm
                title="Please share me the sparks from you mind!"
                open={modalVisit}
                onFinish={async () => {
                    console.log(
                        "request param: " +
                            {
                                ...{ extraInfoContents: extraInfo },
                                ...{ hotelProfileInfo: hotelProfileInfo },
                            }
                    );
                    getHotelSuggestion({
                        ...{ extraInfoContents: extraInfo },
                        ...{ hotelProfileInfo: hotelProfileInfo },
                    });
                    message.success("提交成功");
                    return true;
                }}
                onOpenChange={setModalVisit}
            >
                <div>Topic & Events</div>
                <Input style={{ width: "355px" }} /> <br />
                <Input style={{ width: "355px" }} />
                <br />
                <Input style={{ width: "355px" }} />
                <br />
                <Input style={{ width: "355px" }} />
                <br />
                <div>Preferentials</div>
                <Input style={{ width: "355px" }} /> <br />
                <Input style={{ width: "355px" }} />
                <br />
                <div>Holidays</div>
                <Select
                    title="Holidays"
                    mode="multiple"
                    placeholder="Inserted are removed"
                    value={selectedItems}
                    onChange={(value) => {
                        setSelectedItems(value);
                        console.log("current select value: " + value);
                    }}
                    style={{
                        width: "100%",
                    }}
                    options={filteredOptions.map((item) => ({
                        value: item,
                        label: item,
                    }))}
                />
                <div>
                    <br />
                </div>
                <div>Sitelink Specifications</div>
                <Input style={{ width: "355px" }} />{" "}
                <Select
                    showSearch
                    placeholder="Specified Type"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={[
                        {
                            value: "1", // content
                            label: "Title Specify",
                        },
                        {
                            value: "2", // url
                            label: "Final URL Specify",
                        },
                    ]}
                    style={{ width: "200px" }}
                />
                <br />
                <Input style={{ width: "355px" }} />
                <Select
                    showSearch
                    placeholder="Specified Type"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={[
                        {
                            value: "1", // content
                            label: "Title Specify",
                        },
                        {
                            value: "2", // url
                            label: "Final URL Specify",
                        },
                    ]}
                    style={{ width: "200px" }}
                />
                <br />
            </ModalForm>
            <ModalForm
                title="Hello there! Here is an AI tool servers as your inspiration supporter. May I help you?"
                open={optionVisit}
                onFinish={async () => {
                    message.success("提交成功");
                    return true;
                }}
                onOpenChange={setOptionVisit}
                submitter={false}
            >
            <div><br/> <br/></div>
                <Select
                    placeholder="I want to..."
                    onChange={onOptionChange}
                    options={[
                        {
                            value: "content", // content
                            label: "1.Request for content suggestions.",
                        },
                        {
                            value: "translation", // url
                            label: "2.Request for translation suggestions.",
                        },
                    ]}
                    style={{ width: "500px" }}
                />
                <div><br/> <br/></div>
                <br />
            </ModalForm>
        </>
    );
};

export default HotelPage;
