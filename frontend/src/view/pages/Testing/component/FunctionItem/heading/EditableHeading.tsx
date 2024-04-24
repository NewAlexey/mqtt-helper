import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";

import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export const EditableHeading = observer(
    ({ functionTitle, onChangeFunctionTitle }: PropsType) => {
        const [isEditTitle, setIsEditTitle] = useState(false);
        const [temporaryTitle, setTemporaryTitle] = useState(functionTitle);

        return !isEditTitle ? (
            <>
                <Typography variant="h3" fontSize={20} fontWeight={500}>
                    {functionTitle}
                </Typography>
                <EditIcon
                    fontSize="small"
                    className="hover-primary"
                    onClick={() => setIsEditTitle(true)}
                />
            </>
        ) : (
            <>
                <TextField
                    variant="outlined"
                    size="small"
                    error={!Boolean(temporaryTitle)}
                    value={temporaryTitle}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setTemporaryTitle(event.target.value)
                    }
                />
                <DoneIcon
                    className="hover-primary"
                    fontSize="small"
                    onClick={() => {
                        onChangeFunctionTitle(temporaryTitle);
                        setIsEditTitle(false);
                    }}
                />
                <CloseIcon
                    className="hover-primary"
                    fontSize="small"
                    onClick={() => setIsEditTitle(false)}
                />
            </>
        );
    },
);

type PropsType = {
    functionTitle: string;
    onChangeFunctionTitle: (title: string) => void;
};
