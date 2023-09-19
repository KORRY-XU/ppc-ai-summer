import React, { useEffect } from "react";
import { ProCard } from "@ant-design/pro-components";
import RcResizeObserver from "rc-resize-observer";
import { useState } from "react";
import { Button, Space, Input, Select } from "antd";
import { useLocation } from "react-router-dom";
import axios from "axios";

const onSearch = (value) => {
    console.log("search:", value);
};

const hotelProfilePreviewC = {
    sessionToken: "",
    languages: ["Chinese"],
    shortHotelName: "Hilton London Bankside",
    descriptions: [
        "Spacious rooms, spa, and business amenities",
        "Upscale 5-star hotel in London",
    ],
    callouts: [
        "Boutique style hotel",
        "Ideal for business travel",
        "20% off for certificate holders",
        "Luxurious spa hotel",
        "Upscale 5-star accommodation",
    ],
    siteLinks: [
        {
            title: "beauty of the nature",
            finalUrl: null,
            description1: "International Business Forum Conference",
            description2: "Business tycoons gather",
        },
        {
            title: "Spacious guest rooms and suites",
            finalUrl:
                "https://www.ihg.com/crowneplaza/hotels/us/en/new-york/nycpc/hoteldetail/dining",
            description1: "Certificate holders enjoy a 20% discount",
            description2: "Luxurious accommodations for a comfortable stay",
        },
    ],
};

const transHotelProfileLang = {
    shortHotelName: "伦敦银行区希尔顿酒店",
    descriptions: ["宽敞的客房，水疗中心和商务设施", "伦敦的高档五星级酒店"],
    callouts: [
        "精品风格酒店",
        "商务旅行的理想选择",
        "证书持有者可享受8折优惠",
        "豪华水疗酒店",
        "高档五星级住宿",
    ],
    siteLinks: [
        {
            title: "宽敞的客房和套房",
            finalUrl:
                "https://www.ihg.com/crowneplaza/hotels/us/en/new-york/nycpc/hoteldetail/dining",
            description1: "证书持有者享受8折优惠",
            description2: "豪华住宿，舒适入住",
        },
        {
            title: "大自然的美景",
            finalUrl: null,
            description1: "国际商务论坛会议",
            description2: "商业巨头齐聚",
        },
        {
            title: "洲际酒店集团 - 无忧入住",
            finalUrl: null,
            description1: "提供适应性服务的舒适旅行环境",
            description2: "清洁房间和数字化更新，无忧入住",
        },
        {
            title: "汉堡学 - 美式料理",
            finalUrl:
                "https://www.ihg.com/content/gb/en/customer-care/travel-advisory-stay-with-confidence?cm_sp=WEB-_-CP-_-GL-_-QE-_-EV-_-Covid19-_-HMM1-_-ModifyStays?cm_sp=WEB-_-CP-_-GL-_-QE-_-EV-_-Covid19-_-HMM1-_-ModifyStays",
            description1: "提供早餐、午餐和晚餐的经典美式料理",
            description2: "无需预订，提供客房服务",
        },
    ],
};
// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

function HotelContentTranslation() {
    const [token, setToken] = useState("");
    const { state } = useLocation();
    const [responsive, setResponsive] = useState(false);
    const [originHotel, setOriginHotel] = useState(hotelProfilePreviewC);
    const [transHotel, setTransHotel] = useState(transHotelProfileLang);
    useEffect(() => {
        let ignore = false;
        if (state) {
            setOriginHotel(state);
        }
        return () => {
            ignore = true;
        };
    }, []);
    useEffect(() => {
        let ignore = false;
        getSessionToken();
        return () => {
            ignore = true;
        };
    }, []);
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
        {
            value: "fr",
            label: "French",
        },
    ];

    const onChange = (value, label) => {
        const requestParam = {
            ...originHotel,
            sessionToken: token,
            languages: [label.label],
        };
        console.log(`selected ${value}`);
        console.log("label: " + label.label);
        const language = label.label;
        if (token) {
            const url = "/service-ai/ai-tool/translation/hotel-profile";
            axios.post(url, requestParam).then(
                (rsp) => {
                    console.log("Trans response: " + rsp);
                    console.log("收到翻译结果: ", rsp.data);
                    const result = rsp.data;
                    setTransHotel(result[language]);
                },
                (error) => {
                    console.log("获取Trans异常: ", error);
                }
            );
        }
    };
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
                            <Input
                                placeholder="Description2 of Sitelinke 02"
                                value={
                                    originHotel.siteLinks?.length > 1
                                        ? originHotel.siteLinks[1].description2
                                        : ""
                                }
                            />
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
                                value={transHotel.shortHotelName}
                            />
                        </div>
                        <br />
                        <div>Descriptions:</div>
                        <div>
                            <Input
                                placeholder="Description1"
                                style={{ width: "400px" }}
                                value={
                                    transHotel.descriptions.length > 0
                                        ? transHotel.descriptions[0]
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
                                    transHotel.descriptions.length > 1
                                        ? transHotel.descriptions[1]
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
                                    transHotel.siteLinks?.length > 0
                                        ? transHotel.siteLinks[0].title
                                        : ""
                                }
                            />
                        </div>
                        <br />
                        <div>
                            <Input
                                placeholder="Description1 of Sitelinke 01"
                                value={
                                    transHotel.siteLinks?.length > 0
                                        ? transHotel.siteLinks[0].description1
                                        : ""
                                }
                            />
                        </div>
                        <br />
                        <div>
                            <Input
                                placeholder="Description2 of Sitelinke 01"
                                value={
                                    transHotel.siteLinks?.length > 0
                                        ? transHotel.siteLinks[0].description2
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
                                    transHotel.siteLinks?.length > 1
                                        ? transHotel.siteLinks[1].title
                                        : ""
                                }
                            />
                        </div>
                        <br />
                        <div>
                            <Input
                                placeholder="Description1 of Sitelinke 02"
                                value={
                                    transHotel.siteLinks?.length > 1
                                        ? transHotel.siteLinks[1].description1
                                        : ""
                                }
                            />
                        </div>
                        <br />
                        <div>
                            <Input
                                placeholder="Description2 of Sitelinke 01"
                                value={
                                    transHotel.siteLinks?.length > 1
                                        ? transHotel.siteLinks[1].description2
                                        : ""
                                }
                            />
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
