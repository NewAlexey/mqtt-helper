import { PlusIcon } from "src/shared/components/icons/PlusIcon.tsx";
import { MinusIcon } from "src/shared/components/icons/MinusIcon.tsx";

interface ISwitcherProps {
    onClick: () => void;
    state: boolean;
}

export function Switcher({ onClick, state }: ISwitcherProps) {
    return state ? (
        <PlusIcon onClick={onClick} />
    ) : (
        <MinusIcon onClick={onClick} />
    );
}
