import React from "react";

import { Button } from "src/shared/components/button/Button.tsx";
import { observer } from "mobx-react-lite";

export const ActionButton = observer((props: PropsType) => {
    return <Button {...props} />;
});

type PropsType = {
    label: string;
    disabled?: boolean;
    className: string;
    onClick: () => void;
    icon: React.ReactElement;
};
