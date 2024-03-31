import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import '@fortawesome/fontawesome-free/css/all.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

Echo.private('messager')
    .listen('MessageEvent', (e) => {
        console.log('withOutSenderReceiver' + e);
    });
Echo.private('messager.1.2')
    .listen('MessageEvent', (e) => {
        console.log(e);
    });



// Echo.join('group_chat.1').here((user) => {
//     console.log(user);
// }).joining((user) => {
//     console.log(user.name);
// }).leaving((user) => {
//     console.log(user.name);
// }).listen('group_chatEvent', (e) => {
//     console.log(e);
// }).error((error) => {
//     console.error(error);
// });
