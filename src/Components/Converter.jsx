
import "../Components/Css/Converter.css"
import "../Components/Css/Fonts.css"

function Converter() {
  return (
    <div className="w-screen h-screen bg-neutral-50 flex items-center justify-center relative">
      {/*  theme switch button  */}
        <button className="theme-switch bg-neutral-950 p-3 rounded-full hover:bg-neutral-800 duration-300 hover:scale-105">
            <box-icon name='sun' color="var(--neutral-50)"></box-icon>
        </button>
        {/*  theme switch button  */}
      <h1 className="roboto-black">Converter</h1>
    </div>
  );
}

export default Converter;