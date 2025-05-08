import type {FC} from "react";


type AutoRefreshCheckboxProps = {
    autoRefresh: boolean;
    setAutoRefresh: (value: boolean) => void;
    enabled: boolean;
}

const AutoRefreshCheckbox: FC<AutoRefreshCheckboxProps> = ({autoRefresh, setAutoRefresh, enabled}) => {
    return (
        <label>
            <input
                type="checkbox"
                checked={autoRefresh}
                onChange={() => setAutoRefresh(!autoRefresh)}
                disabled={!enabled}
            />
            Auto refresh every 5 seconds
        </label>
    );
};

export default AutoRefreshCheckbox;