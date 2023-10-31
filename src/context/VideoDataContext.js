import React, { createContext, useContext, useEffect, useState } from 'react';
import { CountryCodeContext } from './countryCodeContext';
import { fetchFromAPI } from '../fetchAPI';

const VideoDataContext = createContext();
const { Provider } = VideoDataContext;

const VideoDataProvider = ({ children }) => {
    const [homeVdos, setHomeVdos] = useState([]);
    const [trendingVdos, setTrendingVdos] = useState([]);
    const countryCode = useContext(CountryCodeContext);

    useEffect(() => {
        const getHomeVdosFromApi = async () => {
            const apiData = await fetchFromAPI(`home?geo=${countryCode || "VN"}&lang=vi&type=now`);
            setHomeVdos(prev => [...prev, ...apiData.data]);
        };

        const getTrendingVdosFromApi = async () => {
            const apiData = await fetchFromAPI(`trending?geo=${countryCode || "VN"}&lang=vi&type=now`);
            setTrendingVdos(prev => [...prev, ...apiData.data]);
        };

        getHomeVdosFromApi();
        getTrendingVdosFromApi();

    }, [countryCode]);

    return (
        <Provider value={{ homeVdos, trendingVdos }}>
            {children}
        </Provider>
    );
};

export { VideoDataContext, VideoDataProvider };
