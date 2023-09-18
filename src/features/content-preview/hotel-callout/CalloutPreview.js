import React from "react";
import Callout from "./Callout";


function CalloutPreview({profile}) {

    const {callouts} = profile;
    
    let content;
    if (callouts?.length > 0) {
        content = callouts.map((callout) => <Callout callout={callout}/>);
    }
    
    return (
        <div>
            {content}
        </div>
    );
}

export default CalloutPreview;
