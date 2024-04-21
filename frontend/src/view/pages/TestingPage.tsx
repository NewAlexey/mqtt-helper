import Typography from "@mui/material/Typography";

import { FunctionModelsContainer } from "src/view/pages/component/FunctionContainer/FunctionModelsContainer.tsx";

export const TestingPage = () => {
    return (
        <div>
            <Typography variant="h2" fontSize={30} fontWeight={600}>
                Web-интерфейс тестирования
            </Typography>
            <FunctionModelsContainer />
        </div>
    );
};
