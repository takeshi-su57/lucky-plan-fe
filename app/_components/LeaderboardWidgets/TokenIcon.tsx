import { useRef, useEffect } from "react";
import Image from "next/image";

export type TokenIconProps = {
  token: string;
  width: number;
  height: number;
};

export default function TokenIcon({ token, width, height }: TokenIconProps) {
  const svgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const svgImage = svgRef.current;

    if (svgImage) {
      svgImage.onerror = () => {
        svgImage.src = `https://gains.trade/images/tokens/${token.toLowerCase()}.webp`;
        svgImage.onerror = () => {
          svgImage.style.display = "none";
        };
      };
    }
  }, [token]);

  return (
    <>
      <Image
        ref={svgRef}
        src={`https://gains.trade/images/tokens/${token.toLowerCase()}.svg`}
        alt={token}
        width={width ? width : 35}
        height={height ? height : 35}
      />
    </>
  );
}
