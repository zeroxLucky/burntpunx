import Image from "next/image";

const Logo = () => {
  return (
    <div className="logo w-100 flex flex-row justify-center overflow-visible">
      <Image
        priority={true}
        src="/img/logo.png"
        alt="logo"
        sizes="600px"
        width={600}
        height={600}
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
