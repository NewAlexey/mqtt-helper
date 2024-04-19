import { useState } from "react";
import { observer } from "mobx-react-lite";

import "./style.scss";

import { FunctionModel } from "src/store/FunctionModel.ts";
import { FunctionHeading } from "src/view/pages/component/FunctionItem/heading/FunctionHeading.tsx";
import { FunctionContent } from "src/view/pages/component/FunctionItem/content/FunctionContent.tsx";

type FunctionItemPropsType = {
    functionModel: FunctionModel;
    removeFunctionModel: (id: string) => void;
};

export const FunctionItem = observer(
    ({ functionModel, removeFunctionModel }: FunctionItemPropsType) => {
        const [isContentHide, setIsContentHide] = useState(false);

        return (
            <form className="form__container">
                <FunctionHeading
                    id={functionModel.id}
                    isContentHide={isContentHide}
                    removeFunctionModel={removeFunctionModel}
                    setIsContentHide={setIsContentHide}
                />
                {!isContentHide && (
                    <FunctionContent functionModel={functionModel} />
                )}
            </form>
        );
    },
);
