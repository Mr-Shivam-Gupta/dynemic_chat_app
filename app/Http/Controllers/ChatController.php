<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Message;
use App\Models\User;
use App\Events\MessageEvent;
use App\Repositories\ChatRepository;

class ChatController extends Controller
{
    public function __construct(private ChatRepository $chat)
    {
        $this->chat = $chat;
    }
    
    public function index(Request $request,?int $receiverId = null)
    {

        // $message = Message::where(' 'required|string',sender_id', $request->user()->id)->get();
        $message = empty($receiverId) ? [] : $this->chat->getUserMessages((int)$request->user()->id ,(int) $receiverId);
        return Inertia::render('Chat/Chat', ['messages' => $message,
       'recentMessage' => $this->chat->getRecentUserWithMessage($request->user()->id)]);

    }




    public function store(Request $request, ?int $receiverId = null)
    {
        $request->validate([
            'message' => 'required|string',
        ]);
        if(empty($receiverId)){
            return;
        }

        try{
          $message =  $this->chat->sendMessage([
                'sender_id'=> (int) $request->user()->id,
                'receiver_id'=>$receiverId,
                'message'=>$request->message,

            ]);
            event(new MessageEvent($message));
            return Redirect::route('chat.index',$receiverId);
        }catch(\Throwable $th){
            return Redirect::route('chat.index',$receiverId);
        }

    }
}
