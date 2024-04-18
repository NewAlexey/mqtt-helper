import Icon from "src/assets/svg/RemoveIcon.svg?react";
import { ICommonProps } from "src/shared/components/icons/ICommonProps.ts";

import "./style.scss";

export function RemoveIcon(props: ICommonProps) {
    return (
        <div
            className={`common-icon ${props.className ? props.className : ""}`}
            onClick={props.onClick}
        >
            <Icon />
        </div>
    );
}
