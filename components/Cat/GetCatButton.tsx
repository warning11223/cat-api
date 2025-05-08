import styled from 'styled-components';
import type {FC} from "react";

const Button = styled.button<{ disabled: boolean }>`
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: ${(props: { disabled: boolean; }) => (props.disabled ? '#b0c4de' : '#3498db')};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};

    &:hover {
        background-color: ${(props) => (props.disabled ? '#b0c4de' : '#2980b9')};
    }

    &:focus {
        outline: none;
    }
`;

const Spinner = styled.div`
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    width: 9px;
    height: 9px;
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

type GetCatButtonProps = {
    fetchCatData: () => void;
    isLoading: boolean;
    enabled: boolean;
}

const GetCatButton: FC<GetCatButtonProps> = ({fetchCatData, isLoading, enabled}) => {
    return (
        <Button onClick={fetchCatData} disabled={!enabled} >
            {isLoading ? <Spinner/> : "Get cat"}
        </Button>
    );
};

export default GetCatButton;
