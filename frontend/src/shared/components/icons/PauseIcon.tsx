import Icon from "src/assets/svg/PauseIcon.svg?react";
import { ICommonProps } from "src/shared/components/icons/ICommonProps.ts";

export function PauseIcon(props: ICommonProps) {
    return (
        <div
            className={`common-icon ${props.className ? props.className : ""}`}
            onClick={props.onClick}
        >
            <Icon />
        </div>
    );
}
