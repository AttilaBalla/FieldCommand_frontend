import React from "react";
import {ProjectBadge} from "../../../util/ProjectBadge";

export function UserProjectsElement(props) {

    return(
       <React.Fragment>
           <input type="checkbox"
                  defaultChecked={(props.checked) ? "checked" : null}
                  name="projects"
                  value={props.shortname}
                  onChange={props.toggleCheckbox}
           />
           <ProjectBadge project={props.shortname} displayName={true}/>
       </React.Fragment>
    )
}
