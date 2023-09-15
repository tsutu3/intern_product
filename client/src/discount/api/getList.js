const toJson = async (res) => {
    const json = await res.json();
    if(res.ok){
        return json;
    }else{
        throw new Error(json.message);
    }
}

//全スーパーマーケットを取得
export const getSuperMarket = async () =>{
    const res = await fetch('http://127.0.0.1:8000/api/list/', {
        method: 'GET',
    })
    return await toJson(res);
}

//全スーパーマーケットを取得
export const getSuperDetail = async (id) => {
    const res = await fetch(`http://localhost:8000/api/supermarkets/${id}/foods`, {
        method : 'GET',
    })
    return await toJson(res);
}

//カテゴリ別一覧を取得
// export const getCategory = async (cat) => {
//     const res = await fetch(`http://localhost:8000/daily/${cat}`, {
//         method: 'GET',
//     })
//     return await toJson(res)
// }

// 一致した店の情報を取得
export const searchSuperMarket = async (query) => {
    const res = await fetch('http://127.0.0.1:8000/api/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Search: query }),
    });
  
    return await toJson(res);
}

// 特定の店の商品をDeleteする
export const itemDelete = async (superid, foodid) => {
    const res = await fetch(`http://127.0.0.1:8000/api/supermarkets/${superid}/foods/${foodid}/`, {
        method : 'DELETE',
    })
    return await res;
}

// 特定の店の商品を新たに登録する
export const itemRegister = async (Food, NowPrice, DR, date, superid) => {
    const res = await fetch(`http://127.0.0.1:8000/api/supermarkets/${superid}/foods/`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ 
            "last_updated": date,
            "food_name": Food,
            "price_after_discount": NowPrice,
            "discount_rate": DR,
            "supermarket": superid
         }),
    })
    return await res;
}

//該当スーパー名を取得
export const getSupermarketName = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/api/supermarket-name/${id}/`, {
        method : 'GET',
    })
    return await toJson(res);
}