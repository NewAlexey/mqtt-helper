import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";

import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";

export const EditableHeading = observer(
    ({
        id,
        functionTitle,
        onChangeFunctionTitle,
        isFunctionSave,
        saveFunctionModel,
    }: EditableHeadingProps) => {
        const [isEditTitle, setIsEditTitle] = useState(false);
        const [temporaryTitle, setTemporaryTitle] = useState(functionTitle);

        return !isEditTitle ? (
            <>
                <Typography variant="h3" fontSize={20} fontWeight={500}>
                    {functionTitle}
                </Typography>
                <IconButton
                    className="hover-primary"
                    onClick={() => setIsEditTitle(true)}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                    disabled={isFunctionSave}
                    onClick={() => saveFunctionModel(id)}
                    className="hover-primary"
                >
                    <SaveIcon fontSize="small" />
                </IconButton>
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
                <IconButton
                    key="done"
                    className="hover-primary"
                    onClick={() => {
                        onChangeFunctionTitle(temporaryTitle);
                        setIsEditTitle(false);
                    }}
                >
                    <DoneIcon fontSize="small" />
                </IconButton>
                <IconButton
                    className="hover-primary"
                    onClick={() => setIsEditTitle(false)}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </>
        );
    },
);

export type EditableHeadingProps = {
    id: string;
    functionTitle: string;
    isFunctionSave: boolean;
    saveFunctionModel: (id: string) => void;
    onChangeFunctionTitle: (title: string) => void;
};
