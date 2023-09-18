import React from "react";
import Sitelink from "./Sitelink";

const siteLinkList = [1, 2, 3, 4, 5];

const divStyle = {
    // backgroundColor: "blue",
    maxHeight: "675px",
    maxWidth: "2536px",
};

let content;
if (true) {
    content = siteLinkList.map((siteLink) => <Sitelink />);
}

function SitelinkPreview({ profile }) {
    const { siteLinks } = profile;
    let content;
    if (siteLinks?.length > 0) {
        content = siteLinks.map((siteLink) => <Sitelink siteLink={siteLink} />);
    }
    return (
        <div
            style={{
                // backgroundColor: "blue",
                maxHeight: "675px",
                maxWidth: "2536px",
                float: "none",
            }}
        >
            {content}
        </div>
    );
}

export default SitelinkPreview;
