import Image from "next/image";
import Logomark from '../../../../public/img/logo.png'

const Logo = () => {
    return (
        <div className="logo w-100 flex flex-row justify-center"><Image src={Logomark} alt="logo" sizes="600px"
            objectFit="contain"
            style={{
                width: '100%',
                maxWidth: "300px",
                height: 'auto',
            }}
        /></div>
    );
};

export default Logo