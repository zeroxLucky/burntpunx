import Image from "next/image";
import Logomark from "../../../../public/img/logo.png";

const Logo = () => {
  return (
    <div className="logo w-100 flex flex-row justify-center">
      <Image
        src={Logomark}
        alt="logo"
        sizes="600px"
        style={{
          width: "100%",
          maxWidth: "366px",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default Logo;
