import "../Components/Css/Converter.css"
import "../Components/Css/Fonts.css"
import CurrencyDropDown from '../Components/CurrencyDropDown.jsx';

function Converter() {
    return (
        <div className="w-screen h-screen bg-neutral-50 flex items-center justify-center relative">

            {/*  theme switch button  */}
            <button
                className="theme-switch bg-neutral-950 p-3 rounded-full hover:bg-neutral-800 duration-300 hover:scale-105">
                <box-icon name='sun' color="var(--neutral-50)"></box-icon>
            </button>
            {/*  theme switch button  */}

            <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12">
                <div
                    className=" col-span-full md:col-span-2 lg:col-span-4 md:col-start-2 lg:col-start-5">
                    <h1 className="roboto-medium title text-center mb-[90px]">Currency Converter</h1>
                    {/*  ==============================================================================  */}

                    <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-full sm:flex justify-evenly items-center">
                            <span className="px-3 roboto-medium">Select Currency</span>
                            <CurrencyDropDown />
                            <button className="m-auto h-[35px] w-[35px] rounded bg-neutral-500 my-3 flex justify-center items-center">
                                <box-icon type='solid' color="var(--neutral-50)" name='chevrons-right'></box-icon>
                            </button>
                            <CurrencyDropDown/>
                        </div>
                    </div>


                    {/*  ==============================================================================  */}
                </div>
            </div>

        </div>
    );
}

export default Converter;