import { useEffect, useState } from "react";

export const useBg = (dataBg: string) => {
    const [bg, setBg] = useState('');

    useEffect(() => {
            if(dataBg.includes('Clear') || dataBg.includes('Few')) {setBg('sun')}
            else if(dataBg.includes('Rain') || dataBg === 'Thunderstorm') {setBg('rain')}
            else if(dataBg === 'Snow') {setBg('snow')}
            else {setBg('cloudy')}
        }, [dataBg])

        return bg;
}