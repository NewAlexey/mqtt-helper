import Icon from "src/assets/svg/PlusIcon.svg?react";
import { ICommonProps } from "src/shared/components/icons/ICommonProps.ts";

import "./style.scss";

export function PlusIcon(props: ICommonProps) {
    return (
        <div
            className={`common-icon ${props.className ? props.className : ""}`}
            onClick={props.onClick}
        >
            <Icon />
        </div>
    );
}
