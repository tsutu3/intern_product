from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .search_stores import get_stores
from .models import Supermarket, Food
from rest_framework import generics
from rest_framework.decorators import action
from .serializers import FoodSerializer, SupermarketSerializer

class Search(APIView):
    def get(self, request):
        return Response("OK", status=status.HTTP_200_OK)
        # return Response(search_paper.main(search["Search"]))

    def post(self, request, *args, **kwargs):
        search_word = request.data
        # return Response(search_paper.main(search_word["Search"]))

        search_result_list = get_stores(search_word['Search'])
        
        return Response(search_result_list)

class ListAllStore(APIView):
    def get(self, request):
        try:
            stores = Supermarket.objects.all()

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
                
            return Response(store_list)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class Detail_Shop(APIView):
#     def get(self, request, pk):
#         try:
#             try:
#                 stores = Supermarket.objects.get(id=pk)
#             except:
#                 error_msg = "そんなidのスーパーマーケットはないよ！"
#                 return Response(error_msg, status=status.HTTP_404_NOT_FOUND)
            
            
#             res_list = []
#             for s in stores.food_set.all():
#                 original_price = s.price_after_discount / (100 - s.discount_rate) * 100
#                 res_list.append(
#                     {
#                     'id': s.id,
#                     'food_name': s.food_name,
#                     'price_after_discount': s.price_after_discount,
#                     'discount_rate': s.discount_rate,
#                     'price_before_discount': original_price,
#                     'register_date': s.last_updated
#                     }
#                 )
#             return Response(res_list)
#         except:
#             return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class FoodViewSet(viewsets.ModelViewSet):
    serializer_class = FoodSerializer
    def get_queryset(self):
        # URLからSupermarketのidを取得
        supermarket_id = self.kwargs['supermarket_id']
        # 特定のSupermarketに関連付けられたFoodのクエリセットを返す
        return Food.objects.filter(supermarket__id=supermarket_id)
    
    @action(detail=False, methods=['DELETE'])
    def delete_all(self, request, supermarket_id=None):
        # 特定のSupermarketに関連付けられた全てのFoodを削除
        Food.objects.filter(supermarket__id=supermarket_id).delete()
        return Response({'message': '全てのFoodが削除されました。'}, status=204)

class SupermarketViewSet(viewsets.ModelViewSet):
    queryset = Supermarket.objects.all()
    serializer_class = SupermarketSerializer


class SupermarketNameAPIView(APIView):
    def get(self, request, supermarket_id):
        try:
            supermarket = Supermarket.objects.get(pk=supermarket_id)
            serializer = SupermarketSerializer(supermarket)
            return Response({'name': serializer.data['name']}, status=status.HTTP_200_OK)
        except Supermarket.DoesNotExist:
            return Response({'error': 'Supermarket not found'}, status=status.HTTP_404_NOT_FOUND)