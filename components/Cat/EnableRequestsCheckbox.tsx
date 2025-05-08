import type {FC} from "react";

type EnableRequestsCheckboxProps = {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
}

const EnableRequestsCheckbox: FC<EnableRequestsCheckboxProps> = ({enabled, setEnabled}) => {
    return (
        <label>
            <input
                type="checkbox"
                checked={enabled}
                onChange={() => setEnabled(!enabled)}
            />
            Enabled
        </label>
    );
};

export default EnableRequestsCheckbox;