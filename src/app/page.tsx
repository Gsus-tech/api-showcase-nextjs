import Image from "next/image";
import ApiButton from "./components/hello-api";
import Search from "./components/search-item";
import CurrencyConverter from "./components/currency-exchange";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-[100vh] max-h-[100vh] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-grow flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <h1 className="text-3xl font-extrabold dark:text-white m-auto"><span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">API Showcase!</span><br></br>Real-Time Data Connections</h1>
        {/* <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 m-auto"></p> */}
        <div className="flex justify-around w-full">
          <div className="border-2 border-gray-300 rounded-lg p-6 shadow-md w-1/3 max-w-md">
            <h1 className="mb-4 text-2xl font-bold text-gray-600 border-b-2 border-gray-300 pb-2">Local API Requests</h1>
            <div className="local-api-requests">
              <ApiButton />
              <span className="p-4"></span>
              <Search />
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-6 shadow-md w-1/3 max-w-md">
            <h1 className="mb-4 text-2xl font-bold text-gray-600 border-b-2 border-gray-300 pb-2">External API Requests</h1>
            <div className="local-api-requests">
              <CurrencyConverter />
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
