import Image from "next/image";
import Logomark from "../../../../public/img/logo.png";

const Logo = () => {
  return (
    <div className="logo w-100 flex flex-row justify-center overflow-visible">
      <Image
        priority={true}
        src={Logomark}
        alt="logo"
        sizes="600px"
        style={{
          width: "75%",
          maxWidth: "366px",
          height: "auto",
          objectFit: "contain",
        }}
        className="logo"
      />
    </div>
  );
};

export default Logo;
