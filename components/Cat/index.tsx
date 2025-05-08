import GetCatButton from "./GetCatButton.tsx";
import styles from "../../styles/Cat.module.scss";
import {type FC, useEffect, useState} from "react";
import AutoRefreshCheckbox from "./AutoRefreshCheckbox.tsx";
import EnableRequestsCheckbox from "./EnableRequestsCheckbox.tsx";

export type CatImageData = {
    height: number;
    id: string;
    url: string;
    width: number;
};

const Cat: FC = () => {
    const [catData, setCatData] = useState<CatImageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const apiKey = import.meta.env.VITE_CAT_API_KEY;

    const fetchCatData = () => {
        setIsLoading(true);
        fetch("https://api.thecatapi.com/v1/images/search", {
            headers: {
                "x-api-key": apiKey,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCatData(data[0]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Ошибка при получении изображения:", error);
                setErrorMessage("Не удалось загрузить изображение. Пожалуйста, попробуйте снова.");
                setIsLoading(false);
            });
    };

    // Выполняем запрос при первом рендере компонента
    useEffect(() => {
        fetchCatData();
    }, []);

    useEffect(() => {
        if (autoRefresh && enabled) {
            const intervalId = setInterval(() => {
                fetchCatData();
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [autoRefresh, enabled]);

    return (
        <div className={styles.catWrapper}>
            {/* Чекбокс для включения/выключения запросов */}
            <EnableRequestsCheckbox
                enabled={enabled}
                setEnabled={setEnabled}
            />

            {/* Чекбокс для автозагрузки каждые 5 секунд */}
            <AutoRefreshCheckbox
                autoRefresh={autoRefresh}
                setAutoRefresh={setAutoRefresh}
                enabled={enabled}
            />

            {/* Кнопка для получения изображения */}
            <GetCatButton
                fetchCatData={fetchCatData}
                isLoading={isLoading}
                enabled={enabled}
            />

            {/* Отображение ошибки, если она есть */}
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

            {/* Отображение изображения */}
            {catData && !errorMessage && (
                <img
                    height={catData?.height}
                    width={catData?.width}
                    src={catData?.url}
                    alt={catData?.id}
                />
            )}
        </div>
    );
};

export default Cat;
