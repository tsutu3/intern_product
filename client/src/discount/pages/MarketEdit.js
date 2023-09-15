import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSuperDetail, itemDelete, itemRegister, getSupermarketName } from '../api/getList';


export const MarketEdit = () => {
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

    // Delete Function
    const onClickDelete = (superid, itemid) => {
        // 「OK」時の処理終了
        if(window.confirm('Do you really want to delete it?')){
            itemDelete(superid, itemid)
            .catch(e => {
                throw new Error(e)
            })
        }
        
        // 「キャンセル」時の処理開始
        else{
            window.alert('Cancel Delete'); // 警告ダイアログを表示
        }
        navigate(0);
    }

    // Input Function
    // 入力時の数値チェック
    const InputCheck = (NowPrice, DR) => {
        var check = false;
        if(isNumeric(DR) && isNumeric(NowPrice)){
            // 割引が0〜100か
            if(0<= DR && DR <= 100){
                // 元々の価格が正の値か
                const origin_price = parseInt(NowPrice * 100 / (100 - DR))
                if(0 <= origin_price){
                    check = true;
                }
            }
        }
        return check
    }

    const onClickRegister = (Food, NowPrice, DR, date, superid) => {
        // 登録するか再確認
        if(window.confirm('Do you really want to register it?')){
            // 入力時の数値チェック
            if(InputCheck(NowPrice, DR)){
                itemRegister(Food, NowPrice, DR, date, superid)
                .catch(e => {
                    throw new Error(e)
                })
                navigate(0);
            }else{
                window.alert('Please enter the appropriate value. (Price or Discount Rate)'); // 警告ダイアログを表示
            }
            
        } 
        // 「キャンセル」時の処理開始
        else{
            window.alert('Cancel register'); // 警告ダイアログを表示
        }
    }

    const isNumeric = n => !!Number(n)
    const OriginalPrice = (value, d_rate) => {
        // 入力列が数字かどうかを判定
        if(isNumeric(value) && isNumeric(d_rate)){
            if(d_rate === "100"){
                return 0
            }else{
                return parseInt(value * 100 / (100 - d_rate))
            }
            
        }
        else{
            return " "
        }
    }

    const [food_name, setText_foodname] = useState("");
    const [current_price, setText_currentprice] = useState("");
    const [discount_rate, setText_discountrate] = useState("");

    const dateInstance = new Date();

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
                <Link to={`/supermarket/${id}/foods`}><button class="btn_10">Return to your store's top page</button></ Link>
                <h1> </h1>
                {loading ?
                    <h1>Loading....</h1>
                    :
                    <table className="List" border="1" width="300">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col-2">Last Update</th>
                                    <th scope="col-2">Food Name</th>
                                    <th scope="col-4">Price (after discount)</th>
                                    <th scope="col-6">Discount Rate</th>
                                    <th scope="col-6">Original Price </th>
                                    <th scope="col-6"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(detail).map((value) =>
                                    <tr>
                                        <td><center>{value.last_updated}</center></td>
                                        <td><center>{value.food_name}</center></td>
                                        <td><center>¥{value.price_after_discount}</center></td>
                                        <td><center>{value.discount_rate} %</center></td>
                                        <td><center>¥{value.original_price}</center></td>
                                        <td><center><button onClick={() => onClickDelete(value.supermarket, value.id)} class="btn_11">Delete</button></center></td>
                                    </tr>
                                )}
                                <tr>
                                    {/* Last Update */}
                                    <td>
                                    </td> 
                                    {/* food name */}
                                    <td>
                                        <input
                                            value={food_name} required
                                            placeholder="Write Food Name" 
                                            onChange={(event) => setText_foodname(event.target.value)}
                                        />
                                        <p>{food_name}</p>
                                    </td>
                                    {/* Price (after discount) */}
                                    <td>
                                        <input
                                            value={current_price} required
                                            placeholder="Write Current Price(¥)" 
                                            onChange={(event) => setText_currentprice(event.target.value)}
                                        />
                                        <p>¥{current_price}</p>
                                    </td>
                                    {/* Discount Rate*/}
                                    <td>
                                        <input
                                            value={discount_rate} required
                                            placeholder="Write Discount Rate(%)" 
                                            onChange={(event) => setText_discountrate(event.target.value)}
                                        />
                                        <p>{discount_rate} %</p>
                                    </td>
                                    <td>
                                        <center>¥{OriginalPrice(current_price, discount_rate)}</center>
                                        (Autofill)
                                    </td>
                                    <td>
                                        <center>
                                            <button type="submit" onClick={() => onClickRegister(food_name, current_price, discount_rate, dateInstance, id)} class="btn_11">
                                                Input
                                            </button>
                                        </center>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                }
        </center>
        </div>
    )
}
