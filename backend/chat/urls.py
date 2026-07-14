from django.urls import path
from .views import ChatRoomListView, ChatMessageListView

urlpatterns = [
    path('chat/rooms/', ChatRoomListView.as_view(), name='chat_room_list'),
    path('chat/rooms/<uuid:room_id>/messages/', ChatMessageListView.as_view(), name='chat_message_list'),
]
