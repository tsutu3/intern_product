import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSuperDetail, getSupermarketName } from '../api/getList';


export const MarketDetail = () => {
    const initialState = {
        id: '',
        original_price: '',
        food_name: '',
        price_after_discount: '',
        discount_rate: '',
        last_updated: '',
        supermarket: '',
    };
    const initialState_Name = {
        name: '',
    };

    const [detail, setDetail] = useState(initialState)
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(()=>{
        getSuperDetail(id)
        .then(d => {
            setDetail(d)
            setLoading(false)
        })
        .catch(e => {
            throw new Error(e)
        })
    },[id])

    const navigate = useNavigate(); // historyを用意する

    const onClickButton = () => {
        navigate(-1); // 画面遷移を書く
    };

    // 店名表示
    const [supername, setDetail_super] = useState(initialState_Name)
    const [loading_super, setLoading_super] = useState(true);
    useEffect(()=>{
        getSupermarketName(id)
        .then(d => {
            setDetail_super(d)
            setLoading_super(false)
        })
        .catch(e => {
            throw new Error(e)
        })
    },[id])
    
    return(
        <div>
            <center>
                {loading_super ?
                    <h1>Loading....</h1>
                    :
                    <h1>{Object.values(supername)}</h1>
                }
                <button class="btn_10" onClick={onClickButton}>Back</button>
                <h1> </h1>
                {loading ?
                    <h1>Loading....</h1>
                    :
                    <table id="list" className="table" border="1" width="300">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col-2">Last Update</th>
                                    <th scope="col-2">Food Name</th>
                                    <th scope="col-4">Price</th>
                                    <th scope="col-6">Discount Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(detail).map((value) =>
                                    <tr>
                                        <td><center>{value.last_updated}</center></td>
                                        <td><center>{value.food_name}</center></td>
                                        <td>
                                            <center>
                                                <div id="table_line-through">¥{value.original_price}</div> 
                                                ↓
                                                <div id="table_nowprice">¥{value.price_after_discount}</div> 
                                            </center>
                                        </td>
                                        <td><center>{value.discount_rate} %</center></td>
                                    </tr>
                                )}
                    
                                {/* {data.map((value) =>
                                    <tr>
                                        <th scope="row">{value.id}</th>
                                        <td>{{value} ? "🚩" : " "}</td>
                                        <td>{value.name}</td>
                                        <td>{value.pv}</td>
                                    </tr>
                                )} */}
                            </tbody>
                        </table>          
                }
                <h1> </h1>
                <div>
                    <Link to={`/supermarket/${id}/edit`}><button class="btn_10">Edit</button></ Link>
                </div>
            </center>
        </div>
    )
    
}