import { useSelector } from "react-redux";
import { selectAllHotels } from "./hotelSlice";
import { Link } from "react-router-dom";
import { Space, Table, Tag } from "antd";


const columnsNew = [
    {
        title: "HotelId",
        dataIndex: "hotelId",
        key: "hotelId",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "HotelCode",
        dataIndex: "hotelCode",
        key: "hotelCode",
    },
    {
        title: "HotelName",
        dataIndex: "hotelName",
        key: "hotelName",
    },
    {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
        
    },
    {
        title: "Country",
        dataIndex: "country",
        key: "country",
        
    },
    {
        title: "City",
        dataIndex: "city",
        key: "city",
        
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
        
    },
    {
        title: "Language",
        key: "languagesApplied",
        dataIndex: "languagesApplied",
        render: (_, { languagesApplied }) => (
            <>
                {languagesApplied.map((tag) => {
                    let color = tag.length > 5 ? "geekblue" : "green";
                    if (tag === "loser") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <Link to={`/hotel/${record.hotelId}`}>Edit Hotel</Link>
                {/* <a>Invite {record.hotelName}</a> */}
                {/* <a>Delete</a> */}
            </Space>
        ),
    },
];

const HotelList = () => {
    const data = useSelector(selectAllHotels);
    if(!data) {
        return (
            <section>Hotels not found.</section>
        )
    }
    return (
        <div>
            <Table id={{}} columns={columnsNew} dataSource={data} />
        </div>
    );
};

export default HotelList;
