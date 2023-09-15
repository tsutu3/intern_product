import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Wrapper } from "@googlemaps/react-wrapper";

import { searchSuperMarket } from '../api/getList'

export const Search = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    console.log("Query:", query);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await searchSuperMarket(query);
            setSearchResults(data);  
        } catch (error) {
            console.error('Fetching or parsing failed:', error);
        }
        };
        fetchData();
    }, [query]);  // queryが変更された場合に再実行

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

    return (
        <div>
            <center>
                <h1>Search Query: {query}</h1>
                <h2>Search Results</h2>
                <div class="map">
                    <Wrapper apiKey={process.env.REACT_APP_POSIPAN_API_KEY}>
                        <Map />
                    </Wrapper>
                </div>
                <h1> </h1>
                <table id="list" className="table" border="1" width="300">
                    <thead className="table-dark">
                        <tr>
                        {/* <th scope="col">ID</th> */}
                        <th scope="col">Discount Flag</th>
                        <th scope="col">Supermarket Name</th>
                        <th scope="col">Maximum Discount Rate</th>
                        <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result) => (
                        <tr key={result.Supermarket_ID}>
                            {/* <th scope="row">{result.Supermarket_ID}</th> */}
                            <td>{result.Discount_Flag ? "🚩" : " "}</td>
                            <td>{result.Supermarket_Name}</td>
                            <td>{result.Maximum_Discount_Rate} %</td>
                            <td><Link to={`/supermarket/${result.Supermarket_ID}/foods`}><button class="btn_11">Detail</button></ Link></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </center>
            <h1> </h1>
                <Link to={`/`}><button class="btn_10">Back</button></ Link>
            <h1> </h1>
        </div>
    );
    };

export default Search;