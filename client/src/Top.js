import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getSuperMarket } from './discount/api/getList'
import { Wrapper } from "@googlemaps/react-wrapper";
import "./Top.css"

const Map = () => {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState(null);

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: { lat: 26.5013, lng: 128.0593 },
                zoom: 9,
            }));
        }
    }, [ref, map]);

    return <div ref={ref} style={{ height: '500px', width: '100%' }} />;
};

export const Top = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Search: searchTerm }),
        });
        if (response.ok) {
            navigate(`/search/${searchTerm}`);
        } else {
            navigate(`/search/${searchTerm}`);
        }
    };

    const initialState = {
        Supermarket_ID: '',
        Supermarket_Name: '',
        Discount_Flag: false,
        Maximum_Discount_Rate: '',
    }

    const [superlist, setDaily] = useState(initialState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSuperMarket()
        .then(d => {
            setDaily(d)
            setLoading(false)
        })
        .catch(e => {
            throw new Error(e)
        })
    }, [])

    const [nameError, setNameError] = useState('')

    const handleBlur = (e) => {
        const searchTerm = e.target.value
        if (!searchTerm) {
            setNameError('required')
        } else {
            setNameError()
        }
    }

    return (
        <div>
            <center>
                <h1>Nearby shops</h1>
                <div class="map">
                    <Wrapper apiKey={process.env.REACT_APP_POSIPAN_API_KEY}>
                        <Map />
                    </Wrapper>
                </div>
                <h2>Refine Search</h2>
                <input 
                    type="text" 
                    placeholder="SuperMarket Search." 
                    value={searchTerm} 
                    onChange={(e) => 
                        setSearchTerm(e.target.value)
                    }
                    class="c-form-text"
                    onBlur={handleBlur}
                />
                {nameError && <p>{nameError}</p>}
                <h1> </h1>
                <button class="btn_10" onClick={handleSearch} disabled={nameError}>Search</button>
                <h1> </h1>
                <h1> </h1>
                <h1> </h1>

                {loading ?
                    <h1>Loading....</h1>
                    :
                    <table id="list" className="table" border="1" width="300">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col-2">Discount Flag</th>
                                <th scope="col-2">Supermarket Name</th>
                                <th scope="col-4">Maximum Discount Rate</th>
                                <th scope="col-6"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(superlist).map((value) =>
                                <tr>
                                    <td class="flag">{value.Discount_Flag ? "🚩" : " "}</td>
                                    <td>{value.Supermarket_Name}</td>
                                    <td>{value.Maximum_Discount_Rate} %</td>
                                    <td><Link to={`/supermarket/${value.Supermarket_ID}/foods`}><button class="btn_11">Detail</button></ Link></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </center>
            <h1> </h1>
            <h1> </h1>
        </div>
    )
}
