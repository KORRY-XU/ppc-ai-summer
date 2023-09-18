import React, { useEffect } from "react";
import { ProCard } from "@ant-design/pro-components";
import RcResizeObserver from "rc-resize-observer";
import { useState } from "react";
import { Button, Space, Input, Select } from "antd";
import { useLocation } from "react-router-dom";

const onChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
    console.log("search:", value);
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
// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

function HotelContentTranslation() {
    const { state } = useLocation();
    const [responsive, setResponsive] = useState(false);
    const [originHotel, setOriginHotel] = useState(hotelProfilePreviewC);
    const [transHotel, setTransHotel] = useState({});
    useEffect(() => {
        let ignore = false;
        if (state) {
            setOriginHotel(state);
        }
        return () => {
            ignore = true;
        };
    }, []);
    const languageOptions = [
        {
            value: "en",
            label: "English",
        },
        {
            value: "de",
            label: "German",
        },
        {
            value: "zh_CN",
            label: "Chinese",
        },
        {
            value: "jp",
            label: "Japanese",
        },
    ];
    return (
        <>
            {" "}
            <RcResizeObserver
                key="resize-observer"
                // onResize={(offset) => {
                //     setResponsive(offset.width < 596);
                // }}
            >
                <ProCard
                    title="Tanslated Preview by AI Tools"
                    extra="2023年9月12日"
                    // split={responsive ? "horizontal" : "vertical"}
                    split={"vertical"}
                    bordered
                    headerBordered
                >
                    <ProCard title="Origin Text" colSpan="50%" headStyle={{}}>
                        <div style={{ height: 50 }}></div>

                        <div>Short Hotel Name: </div>
                        <div>
                            <Input
                                placeholder="Short Hotel Name"
                                style={{ width: "350px" }}
                                value={originHotel.shortHotelName}
                            />
                        </div>
                        <br />
                        <div>Descriptions:</div>
                        <div>
                            <Input
                                placeholder="Description1"
                                style={{ width: "400px" }}
                                value={
                                    originHotel.descriptions.length > 0
                                        ? originHotel.descriptions[0]
                                        : ""
                                }
                            />
                        </div>
                        <br />
                        <div>
                            <Input
                                placeholder="Description2"
                                style={{ width: "400px" }}
                                value={
                                    originHotel.descriptions.length > 1
                                        ? originHotel.descriptions[1]
                                        : ""
                                }
                            />
                        </div>
                        <br />
                        <div>Sitelinks:</div>
                        <div>
                            <Input
                                placeholder="Title of Sitelinke 01"
                                style={{ width: "450px" }}
                                value={
                                    originHotel.siteLinks?.length > 0
                                        ? originHotel.siteLinks[0].title
                                        : ""
                                }
                            />
                        </div>
                        <br />
                        <div>
                            <Input
                                placeholder="Description1 of Sitelinke 01"
                                value={
                                    originHotel.siteLinks?.length > 0
                                        ? originHotel.siteLinks[0].description1
                                        : ""
                                }
                            />
                        </div>
                        <br />
                        <div>
                            <Input
                                placeholder="Description2 of Sitelinke 01"
                                value={
                                    originHotel.siteLinks?.length > 0
                                        ? originHotel.siteLinks[0].description2
                                        : ""
                                }
                            />
                        </div>
                        <br />
                        <div>
                            <Input
                                placeholder="Title of Sitelinke 02"
                                style={{ width: "450px" }}
                                value={
                                    originHotel.siteLinks?.length > 1
                                        ? originHotel.siteLinks[1].title
                                        : ""
                                }
                            />
                        </div>
                        <br />
                        <div>
                            <Input
                                placeholder="Description1 of Sitelinke 02"
                                value={
                                    originHotel.siteLinks?.length > 1
                                        ? originHotel.siteLinks[1].description1
                                        : ""
                                }
                            />
                        </div>
                        <br />
                        <div>
                            <Input placeholder="Description2 of Sitelinke 02"  value={
                                    originHotel.siteLinks?.length > 1
                                        ? originHotel.siteLinks[1].description2
                                        : ""
                                }/>
                        </div>
                        <br />
                    </ProCard>
                    <ProCard title="Translated Text">
                        <div>
                            <Select
                                showSearch
                                placeholder="Select a Language"
                                optionFilterProp="children"
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                options={languageOptions}
                            />
                        </div>
                        <br />
                        <div>Short Hotel Name: </div>
                        <div>
                            <Input
                                placeholder="Short Hotel Name"
                                style={{ width: "350px" }}
                            />
                        </div>
                        <br />
                        <div>Descriptions:</div>
                        <div>
                            <Input
                                placeholder="Description1"
                                style={{ width: "400px" }}
                            />
                        </div>
                        <br />
                        <div>
                            <Input
                                placeholder="Description2"
                                style={{ width: "400px" }}
                            />
                        </div>
                        <br />
                        <div>Sitelinks:</div>
                        <div>
                            <Input
                                placeholder="Title of Sitelinke 01"
                                style={{ width: "450px" }}
                            />
                        </div>
                        <br />
                        <div>
                            <Input placeholder="Description1 of Sitelinke 01" />
                        </div>
                        <br />
                        <div>
                            <Input placeholder="Description2 of Sitelinke 01" />
                        </div>
                        <br />
                        <div>
                            <Input
                                placeholder="Title of Sitelinke 02"
                                style={{ width: "450px" }}
                            />
                        </div>
                        <br />
                        <div>
                            <Input placeholder="Description1 of Sitelinke 02" />
                        </div>
                        <br />
                        <div>
                            <Input placeholder="Description2 of Sitelinke 01" />
                        </div>
                        <br />
                    </ProCard>
                </ProCard>
            </RcResizeObserver>
            <div style={{ float: "right" }}>
                <Space wrap>
                    <Button
                        onClick={() => console.log("Discard button.")}
                        type="dashed"
                    >
                        Discard
                    </Button>
                    <Button
                        onClick={() => console.log("Submit button.")}
                        type="primary"
                    >
                        That's it!
                    </Button>
                </Space>
            </div>
        </>
    );
}

export default HotelContentTranslation;
