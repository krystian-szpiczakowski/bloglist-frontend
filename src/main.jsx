import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './components/notification/NotificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContextProvider } from './components/UserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <NotificationContextProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </NotificationContextProvider>
    </UserContextProvider>
)