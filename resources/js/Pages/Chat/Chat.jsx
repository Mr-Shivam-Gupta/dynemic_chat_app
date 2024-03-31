import ChatSidebar from '@/Components/Chat/ChatSidebar'
import ChatMessages from '@/Components/Chat/ChatMessages'
import ChatInput from '@/Components/Chat/ChatInput'
import ChatUserInfoHeader from '@/Components/Chat/ChatUserInfoHeader'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function Chat({ auth,messages,recentMessage}) {
    console.log(messages);
    console.log(recentMessage);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={''}>
            <Head title="Chat" />
               <div className=" messanger">
                <div className="messanger h-screen overflow-hidden bg-slate-500 ">
                    <div className="flex">
                      <ChatSidebar recentMessage={recentMessage} />
                        <div className="basis-4/6">
                            <div className="flex justify-center items-center h-screen">
                            <p className='font-bold text-gray-300 text-3xl'>Please select a user to chat...</p>
                            </div>
                           {/* <ChatUserInfoHeader /> 
                            <div className="messanger mt-4">
                                <div className="px-4">
                                <ChatMessages /> 
                                </div>
                                <ChatInput />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
