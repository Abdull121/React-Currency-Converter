import UseCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./Components";
import { useState,useEffect } from "react";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("pkr");
  const currencyInfo = UseCurrencyInfo(from);
 


//   console.log(currencyInfo);
  const options = Object.keys(currencyInfo);
//   console.log(options);
  const [convertAmount, setConvertedAmount] = useState(0);

  
//show default value when page is loaded
  useEffect(()=>{
    if(currencyInfo[to]){
         console.log(currencyInfo[to])
        setConvertedAmount(amount * currencyInfo[to]);

    }   

  },[currencyInfo])


  


  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
    
  };

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('${"https://cdn.pixabay.com/photo/2024/07/16/02/43/graph-8898188_1280.jpg"}')`,
        }}
      >
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options} // Fixed prop name
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectedCurrency={from} // Fixed prop name
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertAmount}
                  currencyOptions={options} // Fixed prop name
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectedCurrency={to} // Fixed prop name
                  amountDisable
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
