import { useState } from "react";
import { observer } from "mobx-react-lite";
import { clsx } from "clsx";

import "./style.scss";

import { FunctionModel } from "src/store/FunctionModel.ts";
import { FunctionHeading } from "src/view/pages/component/FunctionItem/heading/FunctionHeading.tsx";
import { FunctionData } from "src/view/pages/component/FunctionItem/content/FunctionData.tsx";
import { FunctionSetting } from "src/view/pages/component/FunctionItem/content/FunctionSetting.tsx";
import { ActionContainer } from "src/view/pages/component/FunctionItem/content/ActionContainer.tsx";

type FunctionItemPropsType = {
    functionModel: FunctionModel;
    removeFunctionModel: (id: string) => void;
};

export const FunctionItem = observer(
    ({ functionModel, removeFunctionModel }: FunctionItemPropsType) => {
        const [isContentHide, setIsContentHide] = useState(false);

        return (
            <form
                className={clsx(
                    "form__container",
                    functionModel.isError && "request-error",
                )}
            >
                <FunctionHeading
                    id={functionModel.id}
                    isContentHide={isContentHide}
                    removeFunctionModel={removeFunctionModel}
                    setIsContentHide={setIsContentHide}
                />
                {!isContentHide && (
                    <>
                        <FunctionSetting
                            mode={functionModel.mode}
                            onChangeMode={functionModel.onChangeMode}
                        />
                        <FunctionData functionModel={functionModel} />
                        <ActionContainer
                            mode={functionModel.mode}
                            sendRequest={functionModel.sendRequest}
                            isRunning={functionModel.isFetching}
                            isPaused={functionModel.isPaused}
                            startPeriodicRequest={
                                functionModel.startPeriodicRequest
                            }
                            stopPeriodicRequest={
                                functionModel.stopPeriodicRequest
                            }
                            pausePeriodicRequest={
                                functionModel.pausePeriodicRequest
                            }
                            unpausePeriodicRequest={
                                functionModel.unpausePeriodicRequest
                            }
                        />
                    </>
                )}
            </form>
        );
    },
);
