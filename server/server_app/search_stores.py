from .models import Supermarket

def get_stores(search_word):
    stores = Supermarket.objects.filter(name__icontains=search_word)

    store_list = []
    # transform search result to json
    for store in stores:
        discount_flag = False  # 初期値を False に設定
        max_rate = 0 # 最大割引率の初期値を 0 に設定

        # スーパーマーケットのすべての食品を取得
        foods = store.food_set.all()

        # 食品が存在する場合、discount_flag を True に設定
        # 食品が存在する場合、最大割引率を計算
        if foods:
            discount_flag = True
            max_rate = max(food.discount_rate for food in foods)

        store_list.append(
            {
                'Supermarket_ID': store.id,
                'Supermarket_Name': store.name,
                'Discount_Flag': discount_flag,
                'Maximum_Discount_Rate': max_rate,
            }
        )

    return store_list
