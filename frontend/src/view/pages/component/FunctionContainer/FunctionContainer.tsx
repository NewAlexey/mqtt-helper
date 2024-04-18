import { useState } from "react";

import { FunctionItem } from "src/view/pages/component/FunctionItem/FunctionItem.tsx";
import { Button } from "src/shared/components/button/Button.tsx";

import "./style.scss";

type FunctionItemType = {
    id: string;
};

const LIST: FunctionItemType[] = [{ id: "15" }];

export const FunctionContainer = () => {
    const [functionList, setFunctionList] = useState<FunctionItemType[]>(LIST);

    const removeFunctionItem = (id: string) =>
        setFunctionList((prevState) =>
            prevState.filter((item) => item.id !== id),
        );

    return (
        <div className="functions__container">
            <h3>Список функций</h3>
            <Button
                label="Добавить функцию"
                className="right-alignment"
                onClick={() =>
                    setFunctionList([
                        ...functionList,
                        { id: String(new Date().getTime()) },
                    ])
                }
            />
            <div className="functions__content">
                {functionList.map(({ id }) => (
                    <FunctionItem
                        key={id}
                        id={id}
                        removeItem={removeFunctionItem}
                    />
                ))}
            </div>
        </div>
    );
};
