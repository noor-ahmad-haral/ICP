import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import React from "react"
import ReactDOM from "react-dom/client"
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import "inter-ui/inter.css"
// import App from "./App.tsx"
// import "./globals.css"
// import { ThemeProvider } from "next-themes"




// const queryClient = new QueryClient()

// ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//         <QueryClientProvider client={queryClient}>
//             <ThemeProvider defaultTheme="dark" disableTransitionOnChange>
//                 <TooltipProvider>
//                     <App />
//                 </TooltipProvider>
//             </ThemeProvider>
//         </QueryClientProvider>
//     </React.StrictMode>
// )


function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>

    )
}

export default MyApp
