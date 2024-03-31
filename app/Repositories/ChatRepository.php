<?php

namespace App\Repositories;

use App\Models\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use App\Models\User;

class ChatRepository  {

    public function getUserMessages(int $sender_id, int $receiver_id) {
        return Message::whereIn('sender_id', [$sender_id,$receiver_id])
        ->whereIn('receiver_id', [$receiver_id,$sender_id])
        ->get();
    }
    public function getRecentUserWithMessage(int $sender_id){
        DB::statement("SET SESSION sql_mode=''");
        $recentMessages = Message::where(function ($query) use ($sender_id){
            $query->where('sender_id',$sender_id)
            ->orWhere('receiver_id',$sender_id);
        })->groupBy('sender_id','receiver_id')
        ->select('sender_id','receiver_id','message')
        ->orderBY('id','desc')
        ->limit(30)
        ->get();
        
        return $this->getFilterRecentMessage($recentMessages,$sender_id);
    }
    public function sendMessage(array $data){
        return Message::create($data);
    }

    private function getFilterRecentMessage(Collection $recentMessages, int $sender_id): array
    {

        $recentUserWithMessage = [];
        $usedUserIds = [];
        foreach ($recentMessages as $message) {
          $uesrId = $message->sender_id == $sender_id ? $message->receiver_id : $message->sender_id;
          if(!in_array( $uesrId,$usedUserIds)){
            $recentUserWithMessage[] = [
                'user_id'=>$uesrId,
                'message'=>$message->message,
            ];
            $usedUserIds[]= $uesrId;
          }
        }
        foreach ($recentUserWithMessage as $key =>  $userMessage) {
            $recentUserWithMessage[$key]['name'] = User::where('id',$userMessage['user_id'])->value('name') ?? '';
        }
        return $recentUserWithMessage;

    }
}
