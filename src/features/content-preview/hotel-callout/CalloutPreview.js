import React from "react";
import Callout from "./Callout";

const calloutList = [1, 2, 3, 4, 5];

let content;
if (true) {
    content = calloutList.map((callout) => <Callout />);
}

function CalloutPreview() {
    return (
        <div>
            {content}
        </div>
    );
}

export default CalloutPreview;
